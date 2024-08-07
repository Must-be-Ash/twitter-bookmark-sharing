import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);

export async function getBookmarks(userId: string) {
  try {
    const bookmarks = await client.v2.bookmarks(userId);
    console.log(`Fetched ${bookmarks.data.length} bookmarks for user ${userId}`);
    return bookmarks;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  }
}