import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function UserProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { username } = router.query;
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
    router.push('/');
    return null;
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
      {/* Add more profile information and functionality here */}
    </div>
  );
}