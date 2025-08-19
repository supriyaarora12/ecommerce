'use client';

import { useState } from 'react';
import Image from 'next/image';
import Product from './Product';
import Link from 'next/link';

interface ProductData {
  id: number;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
}

interface ProductCarouselProps {
  products: ProductData[];
  title?: string;
  subtitle?: string;
  showCountdown?: boolean;
  showNavigation?: boolean;
  showAddToCart?: boolean;
  className?: string;
}

export default function ProductCarousel({
  products,
  title,
  subtitle,
  showCountdown = false,
  showNavigation = true,
  showAddToCart = true,
  className = ""
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - 4));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, products.length - 4)) % Math.max(1, products.length - 4));
  };

  return (
    <section className={`container mx-auto px-4 py-12 ${className}`}>
      {/* Header */}
      {(title || subtitle || showCountdown) && (
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {subtitle && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-10 rounded bg-red-500"></div>
                <span className="text-gray-600 font-medium">{subtitle}</span>
              </div>
            )}
            {title && (
              <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            )}
          </div>
          
          {/* Countdown Timer - Hidden on mobile */}
          {showCountdown && (
            <div className="hidden md:flex items-center gap-2">
              {["Days", "Hours", "Minutes", "Seconds"].map((label, idx) => (
                <div key={label} className="flex items-center gap-1">
                  <span className="text-xs text-gray-600">{label}</span>
                  <div className="bg-gray-100 px-2 py-1 rounded">
                    <span className="font-bold text-sm">
                      {["03", "23", "19", "56"][idx]}
                    </span>
                  </div>
                  {idx < 3 && (
                    <span className="text-red-500 font-bold text-sm">:</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Navigation Arrows */}
          {showNavigation && (
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="rounded-full bg-white flex items-center justify-center"
              >
                <Image
                  src="/ui/product/Left Arrow.svg"
                  alt="Previous"
                  width={32}
                  height={32}
                />
              </button>
              <button
                onClick={nextSlide}
                className="rounded-full bg-white flex items-center justify-center"
              >
                <Image
                  src="/ui/product/Right Arrow.svg"
                  alt="Next"
                  width={32}
                  height={32}
                />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Products Grid */}
      <div className="relative overflow-hidden">
        <div 
          className="flex gap-6 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 280}px)` }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="block"
            >
              <Product
                {...product}
                showAddToCart={showAddToCart}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
