'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: 1, name: 'Phones', icon: '/ui/homepage/Category-CellPhone.svg' },
  { id: 2, name: 'Computers', icon: '/ui/homepage/Category-Computer.svg' },
  { id: 3, name: 'SmartWatch', icon: '/ui/homepage/Category-SmartWatch.svg' },
  { id: 4, name: 'Camera', icon:'/ui/homepage/Category-Camera.svg' },
  { id: 5, name: 'HeadPhones', icon: '/ui/homepage/Category-Headphone.svg' },
  { id: 6, name: 'Gaming', icon: '/ui/homepage/Category-Gamepad.svg' }
];

export default function BrowseByCategory() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-5 h-10 bg-red-500 rounded"></div>
            <span className="text-sm text-red-500 font-medium">Categories</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Browse By Category</h2>
        </div>
        
        {/* Navigation Arrows */}
        <div className="flex gap-2">
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

      {/* Category Cards */}
      <div className="grid grid-cols-6 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg cursor-pointer transition-all duration-300 hover:bg-red-500 hover:border-red-500 group"
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-4">
              <Image
                src={category.icon}
                alt={category.name}
                width={48}
                height={48}
                className={`transition-colors duration-300 ${
                  hoveredCategory === category.id ? 'filter brightness-0 invert' : 'filter brightness-0'
                }`}
              />
            </div>
            <span className={`text-sm font-medium transition-colors duration-300 ${
              hoveredCategory === category.id ? 'text-white' : 'text-gray-900'
            }`}>
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}