'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import confetti from 'canvas-confetti';
import { getUserByUsername, UserData } from '@/lib/twitter';

export default function UserPage({ params }: { params: { username: string } }) {
  const username = params.username;
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("UserPage mounted. Username:", username);
    confetti();

    async function fetchUserData() {
      if (username) {
        try {
          setLoading(true);
          const data = await getUserByUsername(username);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError('Failed to load user data. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    }

    fetchUserData();
  }, [username]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribing with email:', email);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username }),
      });
      if (response.ok) {
        setIsSubscribed(true);
        confetti();
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(url);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>No user data available.</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <Image
          src={userData.profile_image_url || "/placeholder-avatar.png"}
          alt="User avatar"
          width={100}
          height={100}
          className="rounded-full mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{userData.name}</h1>
        <p className="text-gray-600 italic mb-8">{userData.description || "No bio available"}</p>
        
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
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
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
      </main>
    </div>
  );
}