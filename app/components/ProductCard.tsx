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
  const { addToCart } = useCart();
  const { removeFromWishlist } = useWishlist();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    addToCart({ id,
  name,
  image,
  price,                    
  originalPrice: oldPrice ?? price,
  discountedPrice: price,   
  discount: oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0,
  rating: 0,                 // placeholder until you have real data
  reviews: 0,                
  quantity: 1 });
    setLoading(false);
    // Toast notification is handled in CartContext
  };

  return (
    <Link href={`/product/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm relative group">
        {/* Product image */}
        <div className="relative w-full h-64">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain rounded-t-lg"
          />
          {/* Wishlist/Trash button */}
          {isWishlist ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                removeFromWishlist(id);
              }}
              className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
            >
              <TrashIcon className="w-5 h-5 text-gray-600" />
            </button>
          ) : (
            <div className="absolute top-3 right-3">
              <WishListButton item={favoriteItem} />
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="p-4">
          <h3 className="text-sm font-medium mb-1">{name}</h3>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-red-500 font-bold">${price}</span>
            {oldPrice && (
              <span className="text-gray-400 line-through">${oldPrice}</span>
            )}
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="w-full bg-black text-white py-2 text-sm font-medium rounded hover:bg-gray-800 transition"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}  