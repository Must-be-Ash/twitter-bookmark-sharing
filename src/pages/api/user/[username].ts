import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByUsername } from '@/lib/twitter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  if (req.method === 'GET') {
    try {
      const userData = await getUserByUsername(username as string);
      res.status(200).json(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Failed to fetch user data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}