'use client';

import { useSession } from "next-auth/react";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface UserData {
  profile_image_url?: string;
  name?: string;
  description?: string;
}

export default function UserPage() {
  const { data: session } = useSession();
  const params = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      const username = params?.username;
      if (!username) {
        console.error('Username is undefined');
        return;
      }

      const response = await fetch(`/api/user/${username}`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error('Failed to fetch user data');
      }
    }

    if (session?.accessToken) {
      fetchUserData();
    }
  }, [session, params]);

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      {userData.profile_image_url && (
        <Image src={userData.profile_image_url} alt={userData.name || 'User'} width={100} height={100} />
      )}
      <h1>{userData.name || 'User'}</h1>
      <p>{userData.description || 'No description available'}</p>
      {/* Add more user information and functionality here */}
    </div>
  );
}