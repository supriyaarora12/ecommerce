'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Product from './Product';

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
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (!showCountdown) return;

    // Set target date (24 hours from now)
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 24);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        // Reset countdown when it reaches zero
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [showCountdown]);

  const nextSlide = () => {
    const maxIndex = Math.max(0, products.length - (isMobile ? 1 : isTablet ? 2 : 4));
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, products.length - (isMobile ? 1 : isTablet ? 2 : 4));
    setCurrentIndex((prev) => (prev - 1 + maxIndex + 1) % (maxIndex + 1));
  };

  const slideWidth = isMobile ? 280 : isTablet ? 320 : 300;

  // Format countdown values to always show two digits
  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <section className={`w-full px-4 sm:px-6 lg:px-0 py-8 sm:py-12 lg:py-8 ${className}`}>
      {/* Header */}
      {(title || subtitle || showCountdown) && (
        <div className="flex flex-col sm:flex-row lg:pl-[117px] items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            {subtitle && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-10 rounded bg-red-500"></div>
                <span className="text-gray-600 font-medium text-sm sm:text-base">{subtitle}</span>
              </div>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
            )}
          </div>
          
          {/* Countdown Timer - Responsive */}
          {showCountdown && (
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              {[
                { label: "Days", value: countdown.days },
                { label: "Hours", value: countdown.hours },
                { label: "Minutes", value: countdown.minutes },
                { label: "Seconds", value: countdown.seconds }
              ].map((item, idx) => (
                <div key={item.label} className="flex items-center gap-1">
                  <span className="text-gray-600 hidden sm:inline">{item.label}</span>
                  <span className="text-gray-600 sm:hidden">{item.label.charAt(0)}</span>
                  <div className="bg-gray-100 px-1 sm:px-2 py-1 rounded">
                    <span className="font-bold">
                      {formatTime(item.value)}
                    </span>
                  </div>
                  {idx < 3 && (
                    <span className="text-red-500 font-bold">:</span>
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
                className="rounded-full bg-white flex items-center justify-center p-2 hover:bg-gray-50 transition-colors"
              >
                <Image
                  src="/ui/product/Left Arrow.svg"
                  alt="Previous"
                  width={24}
                  height={24}
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </button>
              <button
                onClick={nextSlide}
                className="rounded-full bg-white flex items-center justify-center p-2 hover:bg-gray-50 transition-colors"
              >
                <Image
                  src="/ui/product/Right Arrow.svg"
                  alt="Next"
                  width={24}
                  height={24}
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Products Grid */}
      <div className="relative lg:pl-[117px] overflow-hidden">
        <div 
          className="flex gap-4 sm:gap-6 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * slideWidth}px)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0" style={{ width: `${slideWidth}px` }}>
              <Product
                {...product}
                showAddToCart={showAddToCart}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
