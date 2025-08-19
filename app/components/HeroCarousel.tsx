'use client';

import { useState, useEffect } from 'react';

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  ctaText: string;
  image: string;
}

const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    title: "Up to 10% off Voucher",
    subtitle: "iPhone 14 Series",
    ctaText: "Shop Now",
    image: "/ui/home/hero.svg"
  },
  {
    id: 2,
    title: "Up to 15% off Voucher",
    subtitle: "Samsung Galaxy Series",
    ctaText: "Shop Now",
    image: "/ui/home/hero.svg"
  },
  {
    id: 3,
    title: "Up to 20% off Voucher",
    subtitle: "MacBook Pro Series",
    ctaText: "Shop Now",
    image: "/ui/home/hero.svg"
  },
  {
    id: 4,
    title: "Up to 25% off Voucher",
    subtitle: "iPad Pro Series",
    ctaText: "Shop Now",
    image: "/ui/home/hero.svg"
  },
  {
    id: 5,
    title: "Up to 30% off Voucher",
    subtitle: "AirPods Pro Series",
    ctaText: "Shop Now",
    image: "/ui/home/hero.svg"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full  bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '21/8' }}>
      {/* Carousel Slides */}
      <div className="relative w-full h-full">
        {carouselSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex h-full relative z-0">

              {/* Right Image */}
              <div className="flex-1 z-5 absolute w-496px inset-0 flex items-center justify-end">
                <div className="relative">
                  <img
                    src={slide.image}
                    alt={slide.subtitle}
                    className="object-cover"
                  />
                </div>
              </div>
              {/* Left Content */}
              <div className="flex-1 relative z-10 flex flex-col justify-center px-8 text-white">
                <div className="flex items-center mb-4">
                  <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span className="text-lg font-medium">{slide.subtitle}</span>
                </div>
                <h2 className="text-4xl font-bold mb-6">{slide.title}</h2>
                <button className="inline-flex items-center bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200 w-fit">
                  {slide.ctaText}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentSlide ? 'bg-red-500' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}