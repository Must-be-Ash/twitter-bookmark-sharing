import { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";
import clientPromise from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, sessionToken } = req.query;

  if (typeof username !== "string") {
    return res.status(400).json({ error: "Invalid username" });
  }

  try {
    const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);
    const user = await client.v2.userByUsername(username, {
      "user.fields": ["name", "username", "profile_image_url", "description"],
    });

    if (user.data) {
      // grab user from mongodb
      const mongoClient = await clientPromise;
      const db = mongoClient.db();
      const existingUser = await db.collection("users").findOne({ username });
      if (!existingUser) {
        await db.collection("users").insertOne({
          username,
          createdAt: new Date(),
          name: user.data.name,
          image: user.data.profile_image_url,
        });
      }
      res.status(200).json(user.data);
    } else {
      res.status(400);
    }
  } catch (error) {
    console.error(`Error fetching user data for ${username}:`, error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
}
