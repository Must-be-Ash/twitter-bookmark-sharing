import { TwitterApi, BookmarksV2Paginator } from 'twitter-api-v2';

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);

export async function getBookmarks(userId: string): Promise<BookmarksV2Paginator> {
  try {
    const bookmarks = await client.v2.bookmarks(userId, {
      'tweet.fields': ['text', 'author_id', 'created_at'],
      expansions: ['author_id'],
      'user.fields': ['name', 'username'],
    });

    console.log(`Fetched ${bookmarks.data?.length ?? 0} bookmarks for user ${userId}`);

    return bookmarks;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  }
}