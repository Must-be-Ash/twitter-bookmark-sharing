import { GetServerSideProps } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignIn({ providers }: { providers: any }) {
  const router = useRouter();

  return (
    <div>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};