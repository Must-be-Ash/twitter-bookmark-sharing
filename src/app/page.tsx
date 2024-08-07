'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function Home() {
  const handleSignIn = () => {
    signIn('twitter');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Grow your email list
        </span>{' '}
        by sharing what you&apos;re interested in
      </h1>
      <p className="text-xl mb-8">
        Share your Twitter bookmarks as a weekly newsletter. Think Pinterest but for reading material instead of images.
      </p>
      <button
        onClick={handleSignIn}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 animate-pulse"
      >
        Login with Twitter
      </button>
      <footer className="mt-16">
        <p>
          Built with Claude by{' '}
          <Link href="https://x.com/Must_be_Ash" className="text-blue-400 hover:underline">
            @must_be_ash
          </Link>
        </p>
      </footer>
    </div>
  );
}