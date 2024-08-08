import { getProviders, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function SignIn({ providers }: { providers: any }) {
  return (
    <div>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
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