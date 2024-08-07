'use client';

import './globals.css'
import type { Metadata } from 'next'
import { SessionProvider } from "next-auth/react";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Twitter Bookmark Sharing',
  description: 'Share your Twitter bookmarks as a weekly newsletter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}