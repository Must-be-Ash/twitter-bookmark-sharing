import { TwitterApi } from 'twitter-api-v2';

export interface BookmarksResponse {
  data: any[];
  includes: { users: any[] };
  meta: { result_count: number };
}

export interface UserData {
  id: string;
  name: string;
  username: string;
  profile_image_url?: string;
  description?: string;
}

export async function getUserByUsername(token: string, username: string): Promise<UserData> {
  const client = new TwitterApi(token);
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

export async function getBookmarks(accessToken: string): Promise<BookmarksResponse> {
  const client = new TwitterApi(accessToken);
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

export function createTwitterClient(token: string): TwitterApi {
  return new TwitterApi(token);
}