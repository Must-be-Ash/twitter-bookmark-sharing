import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);

export async function getBookmarks() {
  try {
    const bookmarks = await client.v2.bookmarks({
      expansions: ['author_id'],
      'tweet.fields': ['created_at', 'public_metrics', 'text'],
      'user.fields': ['name', 'username', 'profile_image_url'],
    });

    const bookmarkCount = Array.isArray(bookmarks.data) ? bookmarks.data.length : 0;
    console.log(`Fetched ${bookmarkCount} bookmarks`);
    return bookmarks;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  }
}

export async function getUserByUsername(username: string) {
  try {
    const user = await client.v2.userByUsername(username, {
      'user.fields': ['name', 'username', 'profile_image_url', 'description'],
    });
    
    console.log(`Fetched user data for ${username}`);
    return user.data;
  } catch (error) {
    console.error(`Error fetching user data for ${username}:`, error);
    throw error;
  }
}