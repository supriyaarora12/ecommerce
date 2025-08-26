'use client';

import ProductCarousel from './ProductCarousel';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    originalPrice: 160,
    discountedPrice: 120,
    discount: 40,
    rating: 5,
    reviews: 88,
    image: "/ui/home/gampet.svg"
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    originalPrice: 1160,
    discountedPrice: 960,
    discount: 35,
    rating: 4.5,
    reviews: 75,
    image: "/ui/home/keyboard.svg"
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    originalPrice: 400,
    discountedPrice: 370,
    discount: 30,
    rating: 5,
    reviews: 99,
    image: "/ui/home/monitor.svg"
  },
  {
    id: 4,
    name: "S-Series Comfort Chair",
    originalPrice: 400,
    discountedPrice: 375,
    discount: 25,
    rating: 5,
    reviews: 99,
    image: "/ui/home/chair.svg"
  },
  {
    id: 5,
    name: "S-Series Comfort Chair",
    originalPrice: 400,
    discountedPrice: 375,
    discount: 25,
    rating: 5,
    reviews: 99,
    image: "/ui/home/chair.svg"
  },
  {
    id: 6,
    name: "Gaming Headset Pro",
    originalPrice: 200,
    discountedPrice: 150,
    discount: 25,
    rating: 4.5,
    reviews: 65,
    image: "/ui/home/headset.svg"
  }
  
];

export default function FlashSales() {
  return (
    <>
      <ProductCarousel
        products={products}
        title="Flash Sales"
        subtitle="Today's"
        showCountdown={true}
        showNavigation={true}
        showAddToCart={true}
      />
      
      {/* View All Products Button */}
      <div className="flex justify-center mt-6 sm:mt-8">
        <Link href="/products">
          <button className="bg-red-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md font-medium hover:bg-red-600 transition-colors text-sm sm:text-base">
            View All Products
          </button>
        </Link>
      </div>
    </>
  );
}