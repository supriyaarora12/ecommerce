'use client';

import { useParams } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaTruck, FaUndoAlt, FaEye } from 'react-icons/fa';
import { useToast } from '../../context/ToastContext';
import { getProduct, getRelatedProducts, Product } from '../../../src/services/products';
import WishListButton from '../../components/WishListButton';
import { FavoriteItem } from '../../../src/context/AuthContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showSuccess } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [error, setError] = useState('');

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await getProduct(id as string);
        if (productData) {
          setProduct(productData);
          // Fetch related products after getting the main product
          fetchRelatedProducts(productData.id!, productData.category);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async (productId: string, category?: string) => {
      try {
        setLoadingRelated(true);
        const related = await getRelatedProducts(productId, category, 4);
        setRelatedProducts(related);
      } catch (err) {
        console.error('Error fetching related products:', err);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <Link 
            href="/" 
            className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Create FavoriteItem for the main product
  const mainProductFavoriteItem: FavoriteItem = {
    id: parseInt(product.id!),
    name: product.name,
    image: product.imageUrl || '/ui/homepage/chair.svg',
    price: product.price,
    originalPrice: product.price,
    discountedPrice: product.price,
    discount: 0,
    rating: 0,
    reviews: 0
  };

  const handleAddToCart = () => {
    addToCart({
      id: parseInt(product.id!),
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.imageUrl || '/ui/homepage/chair.svg',
      originalPrice: product.price,
      discountedPrice: product.price,
      discount: 0,
      rating: 0,
      reviews: 0,
    });
    showSuccess('Product added to cart!');
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:underline">Home</Link> / <span>{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Image */}
        <div className="flex-1 relative">
          <Image
            src={product.imageUrl || '/ui/homepage/chair.svg'}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg border w-full h-auto"
          />
          {/* Wishlist button for main product */}
          <div className="absolute top-4 right-4">
            <WishListButton item={mainProductFavoriteItem} />
          </div>
        </div>

        {/* Right Details */}
        <div>
          <h1 className="text-3xl font-semibold">{product.name}</h1>

          {/* Stock Status */}
          <div className="flex items-center gap-2 mt-2">
            <span className={`${product.stock > 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            {product.stock > 0 && (
              <span className="text-gray-500">({product.stock} available)</span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-4">
            <p className="text-2xl font-bold text-red-500">${product.price}</p>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Description:</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
          )}

          {/* Category */}
          {product.category && (
            <div className="mt-4">
              <span className="text-gray-500">Category: </span>
              <span className="font-medium capitalize">{product.category}</span>
            </div>
          )}

          {/* Quantity & Buttons */}
          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center border rounded-md">
              <button
                className="px-3 py-2 hover:bg-gray-100"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-3 py-2 hover:bg-gray-100"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button 
              disabled={product.stock === 0}
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
          </div>

          {/* Delivery Info */}
          <div className="mt-8 border rounded-lg p-4 space-y-4 bg-gray-50">
            <div className="flex items-center gap-3">
              <FaTruck className="text-red-500 text-xl" />
              <div>
                <p className="font-medium">Free Delivery</p>
                <p className="text-gray-500 text-sm">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaUndoAlt className="text-red-500 text-xl" />
              <div>
                <p className="font-medium">Return Delivery</p>
                <p className="text-gray-500 text-sm">Free 30 Days Delivery Returns. <Link href="#" className="underline">Details</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-6 bg-red-500 rounded-sm"></div>
          <h2 className="text-lg font-semibold text-red-500">Related Products</h2>
        </div>
        
        {loadingRelated ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading related products...</p>
          </div>
        ) : relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => {
              // Create FavoriteItem for each related product
              const relatedProductFavoriteItem: FavoriteItem = {
                id: parseInt(relatedProduct.id!),
                name: relatedProduct.name,
                image: relatedProduct.imageUrl || '/ui/homepage/chair.svg',
                price: relatedProduct.price,
                originalPrice: relatedProduct.price,
                discountedPrice: relatedProduct.price,
                discount: 0,
                rating: 0,
                reviews: 0
              };

              return (
                <div key={relatedProduct.id} className="relative border rounded-lg overflow-hidden group bg-white">
                  {/* Icons */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                    <WishListButton item={relatedProductFavoriteItem} size="sm" />
                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors">
                      <FaEye className="text-gray-600 text-sm" />
                    </button>
                  </div>

                  {/* Product Image */}
                  <Link href={`/product/${relatedProduct.id}`}>
                    <div className="relative w-full h-48">
                      <Image 
                        src={relatedProduct.imageUrl || '/ui/homepage/chair.svg'} 
                        alt={relatedProduct.name} 
                        fill
                        className="object-contain p-4 hover:scale-105 transition-transform duration-200" 
                      />
                    </div>
                  </Link>

                  {/* Add to Cart Button */}
                  <button className="absolute bottom-20 left-0 w-full bg-black text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm font-medium">
                    Add To Cart
                  </button>

                  {/* Product Info */}
                  <div className="p-4 text-center">
                    <Link href={`/product/${relatedProduct.id}`}>
                      <h3 className="font-medium text-sm hover:text-red-500 transition-colors line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <div className="flex justify-center items-center gap-2 mt-2">
                      <span className="text-red-500 font-bold">${relatedProduct.price}</span>
                    </div>
                    
                    {/* Stock Status */}
                    <div className="mt-2">
                      <span className={`text-xs ${relatedProduct.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {relatedProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No related products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
