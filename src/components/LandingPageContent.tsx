'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LandingPageContent() {
  const [isPulsing, setIsPulsing] = useState(false);

  const handleTwitterLogin = () => {
    setIsPulsing(true);
    setTimeout(() => {
      signIn('twitter');
    }, 350); // Delay to allow the pulse animation to play
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col justify-between">
      <div className="absolute inset-0 opacity-15 z-0 flex justify-between items-center">
        <svg className="absolute top-0 left-0 w-full h-full transform rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <path d="M0 20 Q 10 30, 20 20 T 40 20 T 60 20 T 80 20 T 100 20" stroke="#d3d3d3" strokeWidth="1" fill="none" />
          <path d="M0 50 Q 10 60, 20 50 T 40 50 T 60 50 T 80 50 T 100 50" stroke="#d3d3d3" strokeWidth="1" fill="none" />
          <path d="M0 80 Q 10 90, 20 80 T 40 80 T 60 80 T 80 80 T 100 80" stroke="#d3d3d3" strokeWidth="1" fill="none" />
        </svg>
      </div>
      <main className="flex-grow flex flex-col items-center justify-center p-4 z-10">
      <h1 className="text-4xl font-bold mb-4 text-center" style={{ color: '#333333' }}>
          Share your bookmarks and <span id="dynamic-gradient" className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">grow your email list</span>
        </h1>
        <p className="text-gray-600 text-center mb-14 max-w-md">
        Share your Twitter bookmarks as a weekly newsletter. Think Pinterest, but for tweets.
        </p>
        <button 
          onClick={handleTwitterLogin} 
          className="flex items-center px-6 py-2 text-white font-bold rounded transition-all duration-300 focus:outline-none focus:ring focus:ring-blue-300 bg-blue-500 glow-pulse hover:glow-pulse-bright mt-4">
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

      {isPulsing && <div className="fixed inset-0 bg-blue-500 animate-pulse-expand z-50"></div>}

      <style jsx>{`
        .animated-gradient {
          background: linear-gradient(-45deg, #3b82f6, #2563eb, #1d4ed8, #1e40af);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .glow-pulse {
          animation: glow 1.5s ease-in-out infinite alternate;
        }

        .glow-pulse-bright {
          animation: glow-bright 0.5s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from {
            box-shadow: 0 0 5px -5px #3b82f6;
          }
          to {
            box-shadow: 0 0 20px -5px #3b82f6;
          }
        }

@keyframes glow-bright {
  from {
    box-shadow: 0 0 20px 2px #3b82f6;
  }
  to {
    box-shadow: 0 0 40px 8px #3b82f6;
  }
}

        @keyframes pulse-expand {
          0% {
            opacity: 0.2;
            transform: scale(0);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-pulse-expand {
          animation: pulse-expand 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}