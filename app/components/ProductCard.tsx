"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishListContext"; 
import { TrashIcon } from "@heroicons/react/24/outline";

import WishListButton from "./WishListButton";
import { FavoriteItem } from "../../src/context/AuthContext";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  isWishlist?: boolean; // true if showing inside wishlist page
}

export default function ProductCard({
  id,
  name,
  image,
  price,
  oldPrice,
  isWishlist = false,
}: ProductCardProps) {
  const { addToCart, cart } = useCart();
  const { removeFromWishlist } = useWishlist();
  const [loading, setLoading] = useState(false);

  // Check if product is already in cart
  const isInCart = cart.some(item => item.id === id);

  // Create FavoriteItem object for WishListButton
  const favoriteItem: FavoriteItem = {
    id,
    name,
    image,
    price,
    originalPrice: oldPrice ?? price,
    discountedPrice: price,
    discount: oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0,
    rating: 0, // placeholder until you have real data
    reviews: 0
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    e.stopPropagation(); // Prevent event bubbling
    
    if (isInCart) return; // Don't add if already in cart
    
    setLoading(true);
    addToCart({ 
      id,
      name,
      image,
      price,                    
      originalPrice: oldPrice ?? price,
      discountedPrice: price,   
      discount: oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0,
      rating: 0,                 // placeholder until you have real data
      reviews: 0,                
      quantity: 1 
    });
    setLoading(false);
    // Toast notification is handled in CartContext
  };

  return (
    <Link href={`/product/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm relative group">
        {/* Product image */}
        <div className="relative w-full h-48 sm:h-64">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain rounded-t-lg p-4"
          />
          {/* Wishlist/Trash button */}
          {isWishlist ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeFromWishlist(id);
              }}
              className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
            >
              <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          ) : (
            <div className="absolute top-3 right-3">
              <WishListButton item={favoriteItem} size="sm" />
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="p-3 sm:p-4">
          <h3 className="text-xs sm:text-sm font-medium mb-1 line-clamp-2">{name}</h3>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <span className="text-red-500 font-bold text-sm sm:text-base">${price}</span>
            {oldPrice && (
              <span className="text-gray-400 line-through text-xs sm:text-sm">${oldPrice}</span>
            )}
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={loading || isInCart}
            className={`w-full py-2 text-xs sm:text-sm font-medium rounded transition ${
              isInCart 
                ? 'bg-green-500 text-white cursor-default' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {loading ? "Adding..." : isInCart ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}  