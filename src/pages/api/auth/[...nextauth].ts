import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    providers: [
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      async signIn(user, account, profile) {
        return true;
      },
      async redirect({ url, baseUrl }) {
        // Extract username from user profile if necessary
        const username = user.name || user.username; // Adjust this according to your user object
        return baseUrl + `/${username}`;
      },
      async session({ session, token }) {
        session.user = token.user;
        return session;
      },
      async jwt({ token, user, account, profile }) {
        if (user) {
          token.user = user;
        }
        return token;
      },
    },
    pages: {
      signIn: "/auth/signin",
      signOut: "/auth/signout",
      error: "/auth/error",
      verifyRequest: "/auth/verify-request",
      newUser: null,
    },
  });
