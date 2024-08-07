import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, username } = body;

  if (!email || !username) {
    return NextResponse.json({ error: 'Email and username are required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('subscriptions').insertOne({
      email,
      username,
      createdAt: new Date(),
    });

    console.log(`New subscription added: ${result.insertedId}`);

    return NextResponse.json({ message: 'Subscription added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error adding subscription:', error);
    return NextResponse.json({ error: 'Error adding subscription' }, { status: 500 });
  }
}