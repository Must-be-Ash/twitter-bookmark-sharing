import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import clientPromise from '@/lib/mongodb';
import { getBookmarks, BookmarksResponse } from '@/lib/twitter';
import { sendWeeklyNewsletter } from '@/lib/email';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db();

    const users = await db.collection('users').find().toArray();

    for (const user of users) {
      const bookmarks: BookmarksResponse = await getBookmarks(session.accessToken);
      const subscribers = await db.collection('subscriptions').find({ username: user.username }).toArray();

      let bookmarkListItems = '<li>No bookmarks this week.</li>';
      if (bookmarks.data.length > 0) {
        bookmarkListItems = bookmarks.data.map((bookmark: any) => {
          const author = bookmarks.includes.users.find(u => u.id === bookmark.author_id);
          return `
            <li>
              <a href="https://twitter.com/user/status/${bookmark.id}">${bookmark.text}</a>
              <br>
              by ${author?.name} (@${author?.username})
            </li>
          `;
        }).join('');
      }

      const emailContent = `
        <h1>Weekly Twitter Bookmarks from ${user.name}</h1>
        <ul>
          ${bookmarkListItems}
        </ul>
      `;

      for (const subscriber of subscribers) {
        await sendWeeklyNewsletter(subscriber.email, user.email, emailContent);
      }
    }

    return NextResponse.json({ message: 'Weekly newsletters sent successfully' });
  } catch (error) {
    console.error('Error sending weekly newsletters:', error);
    return NextResponse.json({ error: 'Error sending weekly newsletters' }, { status: 500 });
  }
}