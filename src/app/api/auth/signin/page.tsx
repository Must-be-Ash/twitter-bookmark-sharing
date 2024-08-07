'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = async () => {
    const result = await signIn('twitter', { callbackUrl: '/' });
    if (result?.error) {
      console.error('Sign in error:', result.error);
    }
  };

  return (
    <div>
      <button onClick={handleSignIn}>
        Sign in with Twitter
      </button>
    </div>
  );
}