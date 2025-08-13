'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function NavigationBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useCart(); // ✅ get cart from context

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-[1330px] w-full px-8 mx-auto flex items-center justify-between py-4">
        {/* Brand name */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-black">
            Exclusive
          </Link>
        </div>

        {/* Navigation links */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-black transition-colors">
            Home
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-black transition-colors">
            Contact
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-black transition-colors">
            About
          </Link>
          <Link href="/signup" className="text-gray-700 hover:text-black transition-colors">
            Sign Up
          </Link>
        </div>

        {/* Search bar and icons */}
        <div className="flex items-center space-x-4">
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          {/* Heart icon */}
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          {/* Shopping cart icon */}
          <Link
            href="/cart"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {/* Cart badge */}
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
