// app/category/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../src/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Product from "../../components/Product";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
};

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  // Function to convert slug to readable category name
  const formatCategoryName = (slug: string) => {
    return slug
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    async function fetchProducts() {
      if (!slug) return;
      
      setLoading(true);
      const formattedSlug = Array.isArray(slug) ? slug[0] : slug;
      setCategoryName(formatCategoryName(formattedSlug));

      try {
        const q = query(
          collection(db, "products"),
          where("category", "==", formattedSlug)
        );
        const querySnapshot = await getDocs(q);

        const items: Product[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as Product);
        });

        setProducts(items);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {categoryName} Collection
          </h1>
          <p className="text-gray-600">
            Discover our amazing selection of {categoryName.toLowerCase()} products
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              // Calculate discount for display
              const originalPrice = Math.round(product.price * 1.2); // 20% markup for original price
              const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);
              
              return (
                <Product
                  key={product.id}
                  id={parseInt(product.id) || Math.random()}
                  name={product.name}
                  image={product.imageUrl}
                  originalPrice={originalPrice}
                  discountedPrice={product.price}
                  discount={discount}
                  rating={4.5} // Default rating
                  reviews={Math.floor(Math.random() * 100) + 10} // Random review count
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              We could not find any products in the {categoryName.toLowerCase()} category.
            </p>
            <Link
              href="/"
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        )}

        {/* Product Count */}
        {products.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Showing {products.length} product{products.length !== 1 ? 's' : ''} in {categoryName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}