"use client";

import Link from "next/link";
import { useWishlist } from "../context/WishListContext";
import ProductCard from "../components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

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
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
              oldPrice={item.originalPrice}
              isWishlist={true}
            />
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
