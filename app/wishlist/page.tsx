"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "../context/WishListContext";
import ProductCard from "../components/ProductCard";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  // Static recommended products for "Just For You"
  const recommendedProducts = [
    {
      id: 101,
      name: "Wireless Headphones",
      image: "/ui/home/gampet.svg",
      price: 120,
      oldPrice: 150,
    },
    {
      id: 102,
      name: "Smart Watch",
      image: "/ui/wishlist/laptop.svg",
      price: 99,
      oldPrice: 120,
    },
    {
      id: 103,
      name: "Gaming Mouse",
      image: "/ui/wishlist/game.svg",
      price: 45,
      oldPrice: 60,
    },
    {
      id: 104,
      name: "Mechanical Keyboard",
      image: "/ui/wishlist/m keybord.svg",
      price: 80,
      oldPrice: 100,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Wishlist ({wishlist.length})</h1>
        {wishlist.length > 0 && (
          <Link
            href="/cart"
            className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50"
          >
            Move All To Bag
          </Link>
        )}
      </div>

      {/* Wishlist grid */}
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg overflow-hidden group"
            >
              {/* Product image */}
              <div className="relative w-full h-64 bg-gray-50">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-4"
                />
                {/* Remove from wishlist button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                >
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 
                      111.414 1.414L11.414 10l4.293 4.293a1 1 0 
                      01-1.414 1.414L10 11.414l-4.293 
                      4.293a1 1 0 
                      01-1.414-1.414L8.586 10 4.293 
                      5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Product details */}
              <div className="p-4">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-lg font-semibold mt-2">${item.price}</p>
                <Link
                  href="/cart"
                  className="mt-4 block text-center bg-[#DB4444] text-white py-2 rounded hover:bg-[#C13C3C]"
                >
                  Add To Cart
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">
          Your wishlist is empty.
        </p>
      )}

      {/* Just For You Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-4 h-8 bg-[#DB4444] rounded"></div>
          <h2 className="text-xl font-bold">Just For You</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              oldPrice={product.oldPrice}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
