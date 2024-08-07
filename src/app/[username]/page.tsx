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

  useEffect(() => {
    if (status === 'authenticated' && username) {
      fetch(`/api/user/${username}`)
        .then(res => res.json())
        .then(data => setUserData(data))
        .catch(err => console.error('Error fetching user data:', err));
    }
  }, [status, username]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to view this profile.</div>;
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