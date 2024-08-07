import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { getBookmarks } from '@/lib/twitter';
import { sendWeeklyNewsletter } from '@/lib/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db();

      const users = await db.collection('users').find().toArray();

      for (const user of users) {
        const bookmarks = await getBookmarks();
        const subscribers = await db.collection('subscriptions').find({ username: user.username }).toArray();

        const emailContent = `
          <h1>Weekly Twitter Bookmarks from ${user.name}</h1>
          <ul>
            ${Array.isArray(bookmarks.data) ? bookmarks.data.map((bookmark: any) => `
              <li>
                <a href="https://twitter.com/user/status/${bookmark.id}">${bookmark.text}</a>
                <br>
                by ${bookmark.author?.name} (@${bookmark.author?.username})
              </li>
            `).join('') : 'No bookmarks this week.'}
          </ul>
        `;

        for (const subscriber of subscribers) {
          await sendWeeklyNewsletter(subscriber.email, user.email, emailContent);
        }
      }

      console.log('Weekly newsletters sent successfully');
      res.status(200).json({ message: 'Weekly newsletters sent successfully' });
    } catch (error) {
      console.error('Error sending weekly newsletters:', error);
      res.status(500).json({ error: 'Error sending weekly newsletters' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}