'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    console.log('Session status:', status);
    console.log('Session data:', session);
    setDebugInfo(`Status: ${status}, Session: ${JSON.stringify(session)}`);

    if (status === 'authenticated' && session?.user?.username) {
      console.log('Redirecting to:', `/${session.user.username}`);
      router.push(`/${session.user.username}`);
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading... {debugInfo}</p>;
  }

  if (status === 'unauthenticated') {
    return (
      <div>
        <h1>Welcome to Twitter Bookmark Sharing</h1>
        <p>Sign in to get started:</p>
        <Link href="/api/auth/signin">
          <button>Sign in with Twitter</button>
        </Link>
        <p>{debugInfo}</p>
      </div>
    );
  }

  return (
    <div>
      <p>Redirecting to your profile... {debugInfo}</p>
    </div>
  );
}