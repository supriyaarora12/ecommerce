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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Icon - Only visible on mobile */}
      <div className="lg:hidden relative">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Mobile Dropdown Menu - Absolute positioned overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-2 min-w-48">
            <div className="p-4">
              <nav>
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/category/${item.id}`}
                        className="block py-2 px-3 text-sm text-gray-700 hover:text-black hover:bg-gray-50 rounded-md transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Menu - Only visible on desktop */}
      <div className="hidden lg:block relative w-64 bg-white border-r border-gray-200">
        <div className="p-6">
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
                          <ul className="space-y-2">
                            {item.submenu?.map((subItem, index) => (
                              <li key={index}>
                                <Link
                                  href={`/category/${subItem}`}
                                  className="block py-2 px-3 text-sm text-gray-700 hover:text-black hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2"
                                >
                                  <div className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center">
                                    <span className="text-xs text-gray-500">
                                      {subItem.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
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
    </>
  );
}