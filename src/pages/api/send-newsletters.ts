import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { TwitterApi } from "twitter-api-v2";
import { sendWeeklyNewsletter } from "@/lib/email";

// Import types from twitter-api-v2
import type { TweetV2, UserV2 } from "twitter-api-v2";

interface BookmarksResponse {
  tweets: TweetV2[];
  users: UserV2[];
  meta: { result_count: number };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db();

    const users = await db.collection("users").find().toArray();

    for (const user of users) {
      // Use the user's stored access token or a bearer token
      const twitterClient = new TwitterApi(user.accessToken);

      try {
        const bookmarksResponse = await twitterClient.v2.bookmarks({
          expansions: ["author_id"],
          "tweet.fields": ["created_at", "public_metrics", "text"],
          "user.fields": ["name", "username", "profile_image_url"],
        });

        const bookmarks: BookmarksResponse = {
          tweets: bookmarksResponse.data.data || [],
          users: bookmarksResponse.includes?.users || [],
          meta: {
            result_count: bookmarksResponse.data.meta?.result_count || 0,
          },
        };

        const subscribers = await db
          .collection("subscriptions")
          .find({ username: user.username })
          .toArray();

        let bookmarkListItems = "<li>No bookmarks this week.</li>";
        if (bookmarks.tweets.length > 0) {
          bookmarkListItems = bookmarks.tweets
            .map((tweet: TweetV2) => {
              const author = bookmarks.users.find(
                (u: UserV2) => u.id === tweet.author_id
              );
              return `
              <li>
                <a href="https://twitter.com/user/status/${tweet.id}">${tweet.text}</a>
                <br>
                by ${author?.name} (@${author?.username})
              </li>
            `;
            })
            .join("");
        }

        const emailContent = `
          <h1>Weekly Twitter Bookmarks from ${user.name}</h1>
          <ul>
            ${bookmarkListItems}
          </ul>
        `;

        for (const subscriber of subscribers) {
          await sendWeeklyNewsletter(
            subscriber.email,
            user.email,
            emailContent
          );
        }
      } catch (error) {
        console.error(
          `Error processing bookmarks for user ${user.username}:`,
          error
        );
        // Continue to the next user if there's an error with the current one
        continue;
      }
    }

    console.log("Weekly newsletters sent successfully");
    res.status(200).json({ message: "Weekly newsletters sent successfully" });
  } catch (error) {
    console.error("Error sending weekly newsletters:", error);
    res.status(500).json({ error: "Error sending weekly newsletters" });
  }
}
