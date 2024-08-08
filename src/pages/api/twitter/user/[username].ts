import { NextApiRequest, NextApiResponse } from 'next';
import { TwitterApi } from 'twitter-api-v2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  if (typeof username !== 'string') {
    return res.status(400).json({ error: 'Invalid username' });
  }

  try {
    const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);
    const user = await client.v2.userByUsername(username, {
      'user.fields': ['name', 'username', 'profile_image_url', 'description'],
    });

    if (user.data) {
      res.status(200).json(user.data);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(`Error fetching user data for ${username}:`, error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}