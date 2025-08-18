'use client';

import Image from 'next/image';
import { useCart } from '../context/CartContext'; 
import { useRouter } from 'next/navigation'; // ✅ For navigation

interface ProductProps {
  id: number;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  
  showAddToCart?: boolean;
}

export default function Product({
  id,
  name,
  originalPrice,
  discountedPrice,
  discount,
  rating,
  reviews,
  image,
  
  showAddToCart = true
}: ProductProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Image
          key={i}
          src="/ui/product/fullstar.svg"
          alt="star"
          width={16}
          height={16}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Image
          key="half"
          src="/ui/product/star-half-filled.svg"
          alt="half star"
          width={16}
          height={16}
        />
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Image
          key={`empty-${i}`}
          src="/ui/product/emptystar.svg"
          alt="empty star"
          width={16}
          height={16}
        />
      );
    }

    return stars;
  };

  return (
    <div className="group relative">
      {/* Product Image */}
      <div className="relative w-full h-64 bg-gray-50 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
        
        {/* Add to Cart Button */}
        {showAddToCart && (
          <div className="absolute bottom-0 w-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
            <button
              onClick={() => {
                addToCart({
                  id,
                  name,
                  originalPrice,
                  discountedPrice,
                  discount,
                  rating,
                  reviews,
                  image,
                  
                  price: discountedPrice,
                  quantity: 1
                });
                // Removed router.push('/cart') - no redirect
              }}
              className="text-white py-3 px-8 rounded-md text-sm font-medium transition-colors shadow-lg w-full bg-black"
            >
              Add To Cart
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
          {name}
        </h3>
        
        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="text-red-500 font-bold text-lg">
            ${discountedPrice}
          </span>
          <span className="text-gray-400 line-through text-sm">
            ${originalPrice}
          </span>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          {renderStars(rating)}
          <span className="text-gray-500 text-xs ml-1">
            ({reviews})
          </span>
        </div>
      </div>
    </div>
  );
}
