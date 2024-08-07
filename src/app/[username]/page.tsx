'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function UserPage() {
  const { username } = useParams();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement subscription logic
    setIsSubscribed(true);
  };

  const handleShare = () => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/${username}`;
    navigator.clipboard.writeText(url);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <Image
        src="/placeholder-avatar.png"
        alt="User avatar"
        width={100}
        height={100}
        className="rounded-full mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{username}</h1>
      <p className="text-gray-600 italic mb-8">User bio goes here</p>
      
      {!isSubscribed ? (
        <form onSubmit={handleSubscribe} className="w-full max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 mb-4 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded"
          >
            Subscribe
          </button>
        </form>
      ) : (
        <p className="text-green-600 font-bold mb-8">Successfully subscribed!</p>
      )}
      
      <button
        onClick={handleShare}
        className="mt-8 flex flex-col items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        <span className="mt-1">{isLinkCopied ? 'Copied!' : 'Share'}</span>
      </button>
    </div>
  );
}