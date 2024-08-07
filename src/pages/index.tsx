import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

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
        <button onClick={() => signIn('twitter')}>Sign in with Twitter</button>
      </div>
    );
  }

  return (
    <div>
      <p>Redirecting to your profile...</p>
    </div>
  );
}