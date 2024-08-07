import Head from 'next/head';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Share your bookmarks and grow your email list</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold mb-4">
          Share your bookmarks and <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">grow your email list</span>
        </h1>
        <p className="text-gray-600 mb-8">Share your Twitter bookmarks as a weekly newsletter. Think Pinterest but for reading material instead of images.</p>
        <button className="bg-gradient-to-r from-blue-400 to-purple-600 text-white py-2 px-4 rounded-full flex items-center shadow-lg transform hover:scale-105 transition-transform">
          <img src="/twitter-icon.svg" alt="Twitter" className="h-6 w-6 mr-2" />
          Log in with Twitter
        </button>
      </main>

      <footer className="bg-gray-200 text-center p-4">
        Built with Claude by <a href="https://x.com/Must_be_Ash" className="text-blue-600">@must_be_ash</a>
      </footer>
    </div>
  );
}
