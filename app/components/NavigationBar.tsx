'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishListContext'; 
import { useAuth } from '../../src/context/AuthContext';
import AccountDropdown from "../components/AccountDropdown";
import SearchResults from "./SearchResults";

export default function NavigationBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { cart } = useCart();
  const { wishlist } = useWishlist(); 
  const { user, loading } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(true);
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim()) {
      setShowSearchResults(true);
    }
  };

  const closeSearchResults = () => {
    setShowSearchResults(false);
  };

  return (
    <nav className="bg-white border-b px-4 sm:px-6 lg:pl-[117px] lg:pr-[177px] border-gray-200">
      <div className="w-full flex items-center justify-between py-3 sm:py-4">
        
        {/* Brand */}
        <div className="flex items-center">
          <Link href="/" className="text-lg sm:text-xl lg:text-2xl font-bold text-black">
            Exclusive
          </Link>
        </div>

        {/* Desktop Navigation Links - Hidden below 1024px */}
        <div className="hidden xl:flex items-center space-x-6 lg:space-x-8">
          <Link href="/" className="text-gray-700 hover:text-black transition-colors text-sm lg:text-base">
            Home
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-black transition-colors text-sm lg:text-base">
            Contact
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-black transition-colors text-sm lg:text-base">
            About
          </Link>
          {!loading && !user && (
            <>
              <Link href="/login" className="text-gray-700 hover:text-black transition-colors text-sm lg:text-base">
                Login
              </Link>
              <Link href="/signup" className="text-gray-700 hover:text-black transition-colors text-sm lg:text-base">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Search & Icons */}
        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
          
          {/* Search - Only show on desktop */}
          <div className="hidden lg:block relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              className="w-48 xl:w-64 px-3 lg:px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent text-sm lg:text-base"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500"
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
            <SearchResults
              searchQuery={searchQuery}
              isVisible={showSearchResults}
              onClose={closeSearchResults}
            />
          </div>

          {/* Wishlist (Heart) */}
          <Link
            href="/wishlist"
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-700"
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
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-700"
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
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
          
          {/* Account Dropdown - Only show if user is logged in */}
          {!loading && user && <AccountDropdown />}

          {/* Hamburger Menu Button - Show below 1024px */}
          <button
            onClick={toggleMobileMenu}
            className="xl:hidden p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Show when hamburger is clicked */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent text-sm"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
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
              <SearchResults
                searchQuery={searchQuery}
                isVisible={showSearchResults}
                onClose={closeSearchResults}
              />
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-black transition-colors py-2 border-b border-gray-100 text-sm sm:text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-black transition-colors py-2 border-b border-gray-100 text-sm sm:text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-black transition-colors py-2 border-b border-gray-100 text-sm sm:text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              {!loading && !user && (
                <>
                  <Link 
                    href="/login" 
                    className="text-gray-700 hover:text-black transition-colors py-2 border-b border-gray-100 text-sm sm:text-base"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup" 
                    className="text-gray-700 hover:text-black transition-colors py-2 border-b border-gray-100 text-sm sm:text-base"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}