'use client';

import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function UserProfile() {
  const { data: session, status } = useSession();
  const params = useParams();
  const username = params.username as string;
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('UserProfile - Session status:', status);
    console.log('UserProfile - Session data:', session);
    console.log('UserProfile - Username param:', username);

    if (status === 'authenticated' && username) {
      fetch(`/api/user/${username}`)
        .then(res => res.json())
        .then(data => {
          console.log('UserProfile - Fetched user data:', data);
          setUserData(data);
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
          setError('Failed to fetch user data');
        });
    }
  }, [status, username, session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Please sign in to view this profile.</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <Image src={userData.profile_image_url} alt={userData.name} width={100} height={100} />
      <h1>{userData.name}</h1>
      <p>@{userData.username}</p>
      <p>{userData.description}</p>
    </div>
  );
}