'use client';

import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.username) {
      router.push(`/${session.user.username}`);
    }
  }, [session, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to Twitter Bookmark Sharing</h1>
      {!session && (
        <button onClick={() => signIn("twitter")}>Sign in with Twitter</button>
      )}
    </div>
  );
}