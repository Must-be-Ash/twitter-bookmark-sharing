import { TwitterApi, TweetV2, UserV2 } from 'twitter-api-v2';

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);

export async function getUserByUsername(username: string) {
  try {
    console.log(`Fetching user data for username: ${username}`);
    const user = await client.v2.userByUsername(username, {
      'user.fields': ['name', 'username', 'profile_image_url', 'description'],
    });
    
    console.log(`Fetched user data for ${username}:`, user.data);
    return user.data;
  } catch (error) {
    console.error(`Error fetching user data for ${username}:`, error);
    throw error;
  }
}

export interface BookmarksResponse {
  data: TweetV2[];
  includes: { users: UserV2[] };
  meta: { result_count: number };
}

export async function getBookmarks(): Promise<BookmarksResponse> {
  try {
    const bookmarks = await client.v2.bookmarks({
      expansions: ['author_id'],
      'tweet.fields': ['created_at', 'public_metrics', 'text'],
      'user.fields': ['name', 'username', 'profile_image_url'],
    });

    const bookmarkCount = bookmarks.meta?.result_count ?? 0;
    console.log(`Fetched ${bookmarkCount} bookmarks`);

    return {
      data: Array.isArray(bookmarks.data) ? bookmarks.data : [],
      includes: bookmarks.includes ?? { users: [] },
      meta: {
        result_count: bookmarkCount
      }
    };
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  }
}