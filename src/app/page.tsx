'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.username) {
      router.push(`/${session.user.username}`);
    }
  }, [session, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div>
        <p>Not signed in</p>
        <Link href="/auth/signin">Sign in with Twitter</Link>
      </div>
    );
  }

  return (
    <div>
      <p>Redirecting to your profile...</p>
    </div>
  );
}