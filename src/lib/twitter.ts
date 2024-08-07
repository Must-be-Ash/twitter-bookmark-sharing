import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);

export async function getBookmarks(userId: string) {
  try {
    const bookmarks = await client.v2.bookmarks({
      'tweet.fields': ['text', 'author_id', 'created_at'],
      expansions: ['author_id'],
      'user.fields': ['name', 'username'],
    });

    const bookmarkCount = Array.isArray(bookmarks.data) ? bookmarks.data.length : 0;
    console.log(`Fetched ${bookmarkCount} bookmarks for user ${userId}`);

    return bookmarks;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  }
}