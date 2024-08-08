import { getServerSession } from "next-auth/next";
import { redirect } from 'next/navigation';
import LandingPageContent from '@/components/LandingPageContent';
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user?.username) {
    redirect(`/${session.user.username}`);
  }

  return <LandingPageContent />;
}
