'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { searchProducts, Product } from '../../src/services/products';

interface SearchResultsProps {
  searchQuery: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function SearchResults({ searchQuery, isVisible, onClose }: SearchResultsProps) {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setResults([]);
        setHasSearched(false);
        return;
      }

      setLoading(true);
      setHasSearched(true);
      
      try {
        const searchResults = await searchProducts(searchQuery);
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(performSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  if (!isVisible) return null;

  return (
    <div 
      ref={resultsRef}
      className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
    >
      {loading && (
        <div className="p-4 text-center text-gray-500">
          Searching...
        </div>
      )}
      
      {!loading && hasSearched && searchQuery.trim() && results.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          No products found for &quot;{searchQuery}&quot;
        </div>
      )}
      
      {!loading && results.length > 0 && (
        <div className="py-2">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              onClick={onClose}
              className="flex items-center p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="w-12 h-12 relative flex-shrink-0 mr-3">
                <Image
                  src={product.imageUrl || '/ui/homepage/chair.svg'}
                  alt={product.name}
                  fill
                  className="object-contain rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-500 truncate">
                  {product.description || 'No description available'}
                </p>
                <p className="text-sm font-semibold text-red-500">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
          
          {results.length > 0 && (
            <div className="p-3 border-t border-gray-100">
              <Link
                href={`/search?q=${encodeURIComponent(searchQuery)}`}
                onClick={onClose}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View all {results.length} results →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
