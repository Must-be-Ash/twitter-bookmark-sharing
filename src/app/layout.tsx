import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { SessionProviderWrapper } from './SessionProviderWrapper'

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
      <body className={inter.className}>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  )
}