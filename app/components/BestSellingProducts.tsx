'use client';

import Product from './Product';
import Link from 'next/link';

const bestSellingProducts = [
  {
    id: 7,
    name: "The north coat",
    originalPrice: 360,
    discountedPrice: 260,
    discount: 28,
    rating: 5,
    reviews: 65,
    image: "/ui/homepage/coat.svg"
  },
  {
    id: 8,
    name: "Gucci duffle bag",
    originalPrice: 1160,
    discountedPrice: 960,
    discount: 17,
    rating: 5,
    reviews: 65,
    image: "/ui/homepage/bag.svg"
  },
  {
    id: 9,
    name: "RGB liquid CPU Cooler",
    originalPrice: 170,
    discountedPrice: 160,
    discount: 6,
    rating: 5,
    reviews: 65,
    image: "/ui/homepage/cooler.svg"
  },
  {
    id: 10,
    name: "Small BookSelf",
    originalPrice: 360,
    discountedPrice: 360,
    discount: 0,
    rating: 5,
    reviews: 65,
    image: "/ui/homepage/bookshelf.svg"
  }
];

export default function BestSellingProducts() {
  return (
    <section className="container px-4 lg:pl-[117px] lg:pr-[117px] py-12 bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-5 h-10 bg-red-500 rounded"></div>
            <span className="text-sm text-red-500 font-medium">This Month</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Best Selling Products</h2>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/products">
            <button className="bg-red-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors">
              View All
            </button>
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {bestSellingProducts.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            originalPrice={product.originalPrice}
            discountedPrice={product.discountedPrice}
            discount={product.discount}
            rating={product.rating}
            reviews={product.reviews}
            image={product.image}
            
            showAddToCart={true}
          />
        ))}
      </div>
    </section>
  );
}