'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  icon: string;
  slug: string;
}

const categories: Category[] = [
  { id: 1, name: 'Phones', icon: '/ui/homepage/Category-CellPhone.svg', slug: 'phones' },
  { id: 2, name: 'Computers', icon: '/ui/homepage/Category-Computer.svg', slug: 'computers' },
  { id: 3, name: 'SmartWatch', icon: '/ui/homepage/Category-SmartWatch.svg', slug: 'smartwatch' },
  { id: 4, name: 'Camera', icon:'/ui/homepage/Category-Camera.svg', slug: 'camera' },
  { id: 5, name: 'HeadPhones', icon: '/ui/homepage/Category-Headphone.svg', slug: 'headphones' },
  { id: 6, name: 'Gaming', icon: '/ui/homepage/Category-Gamepad.svg', slug: 'gaming' }
];

export default function BrowseByCategory() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <section className="container px-4 lg:pl-[117px] lg:pr-[117px] py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
        <div className="flex flex-col gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-3 sm:w-5 h-6 sm:h-10 bg-red-500 rounded"></div>
            <span className="text-xs sm:text-sm text-red-500 font-medium">Categories</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Browse By Category</h2>
        </div>
        
        {/* Navigation Arrows - Hidden on mobile */}
        <div className="hidden sm:flex gap-2">
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Category Cards - Grid on mobile, row on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="flex flex-col items-center justify-center p-3 sm:p-4 lg:p-6 border border-gray-200 rounded-lg cursor-pointer transition-all duration-300 hover:bg-red-500 hover:border-red-500 group"
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center mb-2 sm:mb-3 lg:mb-4">
              <Image
                src={category.icon}
                alt={category.name}
                width={48}
                height={48}
                className={`transition-colors duration-300 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ${
                  hoveredCategory === category.id ? 'filter brightness-0 invert' : 'filter brightness-0'
                }`}
              />
            </div>
            <span className={`text-xs sm:text-sm font-medium transition-colors duration-300 text-center ${
              hoveredCategory === category.id ? 'text-white' : 'text-gray-900'
            }`}>
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}