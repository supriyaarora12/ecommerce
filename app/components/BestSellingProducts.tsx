'use client';

import Product from './Product';

const bestSellingProducts = [
  {
    id: 1,
    name: "The north coat",
    originalPrice: 360,
    discountedPrice: 260,
    discount: 28,
    rating: 5,
    reviews: 65,
    image: "/ui/homepage/coat.svg"
  },
  {
    id: 2,
    name: "Gucci duffle bag",
    originalPrice: 1160,
    discountedPrice: 960,
    discount: 17,
    rating: 5,
    reviews: 65,
    image: "/ui/homepage/bag.svg"
  },
  {
    id: 3,
    name: "RGB liquid CPU Cooler",
    originalPrice: 170,
    discountedPrice: 160,
    discount: 6,
    rating: 5,
    reviews: 65,
    image: "/ui/homepage/cooler.svg"
  },
  {
    id: 4,
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
    <section className="container mx-auto px-4 py-12 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-5 h-10 bg-red-500 rounded"></div>
            <span className="text-sm text-red-500 font-medium">This Month</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Best Selling Products</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-red-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors">
            View All
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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