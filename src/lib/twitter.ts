export interface UserData {
  id: string;
  name: string;
  username: string;
  profile_image_url?: string;
  description?: string;
}

export interface BookmarksResponse {
  data: any[];
  includes: { users: any[] };
  meta: { result_count: number };
}

export async function getUserByUsername(username: string): Promise<UserData> {
  const response = await fetch(`/api/twitter/user/${username}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
}

export async function getBookmarks(): Promise<BookmarksResponse> {
  const response = await fetch('/api/twitter/bookmarks');
  if (!response.ok) {
    throw new Error('Failed to fetch bookmarks');
  }
  return response.json();
}