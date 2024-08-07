'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function Home() {
  const handleSignIn = async () => {
    await signIn('twitter');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4">
          Grow your email list by sharing your Twitter bookmarks
        </h1>
        <p className="text-xl sm:text-2xl text-center mb-8">
          Share bookmarks as a weekly newsletter. Think Pinterest but for reading material.
        </p>
        <button
          onClick={handleSignIn}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 animate-pulse"
        >
          Login with Twitter
        </button>
      </main>
      <footer className="py-4 text-center">
        <p>
          Built with Claude by{' '}
          <a
            href="https://x.com/Must_be_Ash"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            @must_be_ash
          </a>
        </p>
      </footer>
    </div>
  );
}