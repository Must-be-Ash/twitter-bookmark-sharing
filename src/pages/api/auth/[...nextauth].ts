import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

// Extend the Session interface
interface ExtendedSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
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
    async signIn({ user, account, profile }) {
      console.log("Sign in callback started");
      try {
        console.log("User:", user);
        console.log("Account:", account);
        console.log("Profile:", profile);
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async session({ session, user }: { session: ExtendedSession; user: User }) {
      console.log("Session callback started");
      try {
        if (session.user) {
          session.user.id = user.id;
        }
        console.log("Session:", session);
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
    async jwt({ token, user, account }) {
      console.log("JWT callback started");
      try {
        if (account) {
          token.accessToken = account.access_token;
        }
        console.log("JWT Token:", token);
        return token;
      } catch (error) {
        console.error("Error in jwt callback:", error);
        return token;
      }
    },
  },
  events: {
    async signIn(message) {
      console.log("signIn event:", message);
    },
    async signOut(message) {
      console.log("signOut event:", message);
    },
    async createUser(message) {
      console.log("createUser event:", message);
    },
    async linkAccount(message) {
      console.log("linkAccount event:", message);
    },
    async session(message) {
      console.log("session event:", message);
    },
  },
  debug: true, // Enable debug messages in the console
};

export default NextAuth(authOptions);