import type { NextApiRequest, NextApiResponse } from 'next'
import { TwitterApi } from 'twitter-api-v2';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session || !session.accessToken) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const client = new TwitterApi(session.accessToken);
    const bookmarks = await client.v2.bookmarks({
      expansions: ['author_id'],
      'tweet.fields': ['created_at', 'public_metrics', 'text'],
      'user.fields': ['name', 'username', 'profile_image_url'],
    });

    res.status(200).json({
      data: Array.isArray(bookmarks.data) ? bookmarks.data : [],
      includes: bookmarks.includes ?? { users: [] },
      meta: {
        result_count: bookmarks.meta?.result_count ?? 0
      }
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
}