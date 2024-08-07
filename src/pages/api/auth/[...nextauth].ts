import NextAuth, { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("Sign In Callback", { user, account, profile, email });
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect Callback", { url, baseUrl });
      return baseUrl;
    },
    async session({ session, user, token }) {
      console.log("Session Callback", { session, user, token });
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("JWT Callback", { token, user, account, profile, isNewUser });
      return token;
    }
  },
  events: {
    async signIn(message) { console.log("signIn", message) },
    async signOut(message) { console.log("signOut", message) },
    async createUser(message) { console.log("createUser", message) },
    async linkAccount(message) { console.log("linkAccount", message) },
    async session(message) { console.log("session", message) },
  },
  debug: true,
};

export default NextAuth(authOptions);