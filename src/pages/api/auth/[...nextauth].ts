
import NextAuth, { NextAuthOptions, User } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: User & {
      username?: string;
    };
  }
}

// Extend the built-in token types
declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.username = (profile as any).data.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.username) {
        session.user.username = token.username;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
};

export default NextAuth(authOptions);
