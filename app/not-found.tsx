// app/not-found.tsx
'use client';

import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-white">
      {/* Breadcrumb */}
      <div className="w-full max-w-6xl px-4 py-6 text-sm text-gray-500">
        <span className="text-gray-400">Home</span> / <span className="text-black font-medium">404 Error</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-[110px] font-bold text-black leading-none">404 Not Found</h1>
        <p className="mt-4 text-lg text-gray-500">
          Your visited page not found. You may go home page.
        </p>

        <Link
          href="/"
          className="mt-8 bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition"
        >
          Back to home page
        </Link>
      </div>
    </main>
  );
}
