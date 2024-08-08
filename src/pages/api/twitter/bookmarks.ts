import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { TwitterApi } from 'twitter-api-v2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    // Use the Twitter API client (make sure you have the correct token)
    const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);
    const bookmarks = await client.v2.bookmarks({
      expansions: ['author_id'],
      'tweet.fields': ['created_at', 'public_metrics', 'text'],
      'user.fields': ['name', 'username', 'profile_image_url'],
    });

    res.status(200).json({
      data: bookmarks.data.data || [],
      includes: bookmarks.includes || { users: [] },
      meta: bookmarks.meta || { result_count: 0 }
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
}