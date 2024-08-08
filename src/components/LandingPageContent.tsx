'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LandingPageContent() {
  const handleTwitterLogin = () => {
    signIn('twitter');
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col justify-between">
      {/* Your existing landing page content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 z-10">
        <h1 className="text-4xl font-bold mb-4 text-center" style={{ color: '#333333' }}>
          Share your bookmarks and <span id="dynamic-gradient" className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">grow your email list</span>
        </h1>
        <p className="text-gray-600 text-center mb-14 max-w-md">
          Share your Twitter bookmarks as a weekly newsletter. Kinda like Pinterest, but different.
        </p>
        <button 
          onClick={handleTwitterLogin} 
          className="flex items-center px-6 py-2 text-white font-bold rounded transition-all duration-300 focus:outline-none focus:ring focus:ring-blue-300 animated-gradient mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0017 3a4.48 4.48 0 00-4.52 4.48 5.06 5.06 0 00.11 1.02A12.94 12.94 0 013 4s-4 9 5 13a13.38 13.38 0 01-7 2c9 5.8 20 0 20-11.5a4.48 4.48 0 00-.08-.83A8.1 8.1 0 0023 3z" />
          </svg>
          Log in with Twitter
        </button>
      </main>
      <footer className="text-center py-4 z-10">
        <p className="text-gray-600">
          Built with Claude by <Link href="https://x.com/Must_be_Ash"><a className="text-blue-500">@must_be_ash</a></Link>
        </p>
      </footer>
    </div>
  );
}