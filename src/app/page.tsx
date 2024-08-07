'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.username) {
      router.push(`/${session.user.username}`);
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return (
      <div>
        <h1>Welcome to Twitter Bookmark Sharing</h1>
        <p>Sign in to get started:</p>
        <Link href="/api/auth/signin">
          <button>Sign in with Twitter</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p>Redirecting to your profile...</p>
    </div>
  );
}