'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchProducts, Product } from '../../src/services/products';
import ProductCard from '../components/ProductCard';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError('');
      
      try {
        const searchResults = await searchProducts(query);
        setResults(searchResults);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to search products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  if (loading) {
    return (
      <div className="max-w-[1330px] mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching for &quot;{query}&quot;...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1330px] mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Search Results
        </h1>
        {query && (
          <p className="text-gray-600">
            {results.length === 0 
              ? `No products found for &quot;${query}&quot;`
              : `${results.length} product${results.length === 1 ? '' : 's'} found for &quot;${query}&quot;`
            }
          </p>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {results.length === 0 && !loading && query && !error && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search terms or browse our categories</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard
              key={product.id}
              id={parseInt(product.id!)}
              name={product.name}
              image={product.imageUrl || '/ui/homepage/chair.svg'}
              price={product.price}
              oldPrice={undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-[1330px] mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading search...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
