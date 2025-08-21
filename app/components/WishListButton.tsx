'use client';

import { useWishlist } from '../context/WishListContext';
import { FavoriteItem } from '../../src/context/AuthContext';

interface WishListButtonProps {
  item: FavoriteItem;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function WishListButton({ item, className = '', size = 'md' }: WishListButtonProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const isInWishlistState = isInWishlist(item.id);
  
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={() => toggleWishlist(item)}
      className={`bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors ${sizeClasses[size]} ${className}`}
      aria-label={isInWishlistState ? "Remove from wishlist" : "Add to wishlist"}
    >
      <svg
        className={`${iconSizeClasses[size]} ${
          isInWishlistState ? "fill-red-500 text-red-500" : "text-gray-600"
        }`}
        fill={isInWishlistState ? "currentColor" : "none"}
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
  );
}
