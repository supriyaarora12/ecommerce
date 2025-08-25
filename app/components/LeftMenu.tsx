'use client';

import { useState } from 'react';
import Link from "next/link";

interface MenuItem {
  id: string;
  label: string;
  hasSubmenu: boolean;
  submenu?: string[];
}

const menuItems: MenuItem[] = [
  {
    id: 'womens-fashion',
    label: "Woman's Fashion",
    hasSubmenu: true,
    submenu: ['dresses', 'tops', 'bottoms', 'accessories', 'bags']
  },
  {
    id: 'mens-fashion',
    label: "Men's Fashion",
    hasSubmenu: true,
    submenu: ['shirts', 'pants', 'suits', 'accessories', 'watches']
  },
  {
    id: 'electronics',
    label: 'Electronics',
    hasSubmenu: true,
    submenu: ['smartphones', 'laptops', 'tablets', 'cameras', 'gaming']
  },
  {
    id: 'home-lifestyle',
    label: 'Home & Lifestyle',
    hasSubmenu: true,
    submenu: ['furniture', 'decor', 'kitchen', 'bath', 'lighting']
  },
  {
    id: 'medicine',
    label: 'Medicine',
    hasSubmenu: true,
    submenu: ['prescription', 'vitamins', 'first-aid', 'personal-care', 'medical-devices']
  },
  {
    id: 'sports-outdoor',
    label: 'Sports & Outdoor',
    hasSubmenu: true,
    submenu: ['fitness', 'outdoor-gear', 'camping', 'hiking', 'water-sports']
  },
  {
    id: 'babies-toys',
    label: "Baby's & Toys",
    hasSubmenu: true,
    submenu: ['clothing', 'diapers', 'feeding', 'toys', 'books']
  },
  {
    id: 'groceries-pets',
    label: 'Groceries & Pets',
    hasSubmenu: true,
    submenu: ['pantry', 'beverages', 'pet-food', 'pet-toys']
  },
  {
    id: 'health-beauty',
    label: 'Health & Beauty',
    hasSubmenu: true,
    submenu: ['skincare', 'makeup', 'fragrances', 'hair-care', 'bath-body']
  }
];

export default function LeftMenu() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="relative w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        {/* <h2 className="text-2xl font-bold text-black mb-6">Exclusive</h2> */}
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id} className="relative">
                <button
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="w-full text-left py-2 px-3 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between group"
                >
                  <span className="text-black">{item.label}</span>
                  {item.hasSubmenu && (
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        hoveredItem === item.id ? 'rotate-90' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </button>
                
                {/* Submenu that appears to the right */}
                {item.hasSubmenu && hoveredItem === item.id && (
                  <>
                    {/* Invisible bridge to prevent hover gap */}
                    <div 
                      className="absolute left-full top-0 w-2 h-full bg-transparent"
                      onMouseEnter={() => setHoveredItem(item.id)}
                    />
                    <div 
                      className="absolute left-full top-0 ml-0 bg-white shadow-xl rounded-lg border border-gray-200 min-w-48 z-50"
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="p-4">
                        {/* <h3 className="font-semibold text-gray-900 mb-3 border-b border-gray-100 pb-2">
                          {item.label}
                        </h3> */}
                        <ul className="space-y-2">
                          {item.submenu?.map((subItem, index) => (
                            <li key={index}>
                              <Link
                                href={`/category/${subItem}`}
                                className="block py-2 px-3 text-sm text-gray-700 hover:text-black hover:bg-gray-50 rounded-md transition-colors duration-200"
                              >
                                {subItem.charAt(0).toUpperCase() + subItem.slice(1).replace(/-/g, ' ')}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}