// src/app/page.tsx
"use client";

import { useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  useEffect(() => {
    const intervalId = setInterval(() => {
      document.querySelector('#dynamic-gradient')?.classList.toggle('bg-gradient-to-r');
      document.querySelector('#dynamic-gradient')?.classList.toggle('bg-gradient-to-l');
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleTwitterLogin = () => {
    window.location.href = "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=read";
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-between text-white">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4 text-center" style={{ color: '#ffffff' }}>
          Share your bookmarks and <span id="dynamic-gradient" className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text transition-all duration-3000">grow your email list</span>
        </h1>
        <p className="text-gray-400 text-center mb-10 max-w-md">
          Share your Twitter bookmarks as a weekly newsletter. Think Pinterest but for reading material instead of images.
        </p>
        <button onClick={handleTwitterLogin} className="flex items-center px-6 py-2 bg-blue-500 text-white font-bold rounded transition-all duration-300 focus:outline-none focus:ring focus:ring-blue-300 glow-button mb-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0017 3a4.48 4.48 0 00-4.52 4.48 5.06 5.06 0 00.11 1.02A12.94 12.94 0 013 4s-4 9 5 13a13.38 13.38 0 01-7 2c9 5.8 20 0 20-11.5a4.48 4.48 0 00-.08-.83A8.1 8.1 0 0023 3z" />
          </svg>
          Log in with Twitter
        </button>
      </main>
      <footer className="text-center py-4">
        <p className="text-gray-400">
          Built with Claude by <Link href="https://x.com/Must_be_Ash"><a className="text-blue-400">@must_be_ash</a></Link>
        </p>
      </footer>
      <style jsx>{`
        .glow-button {
          animation: glow 1.5s infinite alternate;
        }

        @keyframes glow {
          from {
            box-shadow: 0 0 5px #3b82f6, 0 0 10px #3b82f6, 0 0 15px #3b82f6, 0 0 20px #3b82f6;
          }
          to {
            box-shadow: 0 0 10px #60a5fa, 0 0 20px #60a5fa, 0 0 30px #60a5fa, 0 0 40px #60a5fa;
          }
        }

        #dynamic-gradient {
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
