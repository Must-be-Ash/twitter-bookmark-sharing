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
      username?: string | null;
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
    async signIn({ user, account, profile }) {
      console.log("Sign In Callback Started", { user, account, profile });
      try {
        if (profile) {
          user.username = profile.screen_name;
        }
        console.log("Sign In Successful");
        return true;
      } catch (error) {
        console.error("Sign In Error:", error);
        return false;
      }
    },
    async session({ session, user }) {
      console.log("Session Callback Started", { session, user });
      try {
        if (session.user) {
          session.user.id = user.id;
          session.user.username = user.username;
        }
        console.log("Session Callback Completed");
        return session;
      } catch (error) {
        console.error("Session Callback Error:", error);
        return session;
      }
    },
  },
  events: {
    async signIn(message) { console.log("Sign In Event", message) },
    async signOut(message) { console.log("Sign Out Event", message) },
    async createUser(message) { console.log("Create User Event", message) },
    async linkAccount(message) { console.log("Link Account Event", message) },
    async session(message) { console.log("Session Event", message) },
  },
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);