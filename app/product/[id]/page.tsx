'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaTruck, FaUndoAlt, FaEye, FaArrowLeft } from 'react-icons/fa';
import { useToast } from '../../context/ToastContext';
import { getProduct, getRelatedProducts, Product } from '../../../src/services/products';
import WishListButton from '../../components/WishListButton';
import { FavoriteItem } from '../../../src/context/AuthContext';

// Define interface for static products
interface StaticProduct {
  id: number;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  description?: string;
  category?: string;
  stock?: number;
}

// Static products data (from FlashSales and other components)
const staticProducts: StaticProduct[] = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    originalPrice: 160,
    discountedPrice: 120,
    discount: 40,
    rating: 5,
    reviews: 88,
    image: "/ui/home/gampet.svg",
    description: "High-quality gaming controller with ergonomic design and responsive buttons.",
    category: "Gaming",
    stock: 50
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    originalPrice: 1160,
    discountedPrice: 960,
    discount: 35,
    rating: 4.5,
    reviews: 75,
    image: "/ui/home/keyboard.svg",
    description: "Premium mechanical keyboard with RGB backlighting and customizable keys.",
    category: "Electronics",
    stock: 30
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    originalPrice: 400,
    discountedPrice: 370,
    discount: 30,
    rating: 5,
    reviews: 99,
    image: "/ui/home/monitor.svg",
    description: "High-resolution gaming monitor with fast refresh rate and low latency.",
    category: "Electronics",
    stock: 25
  },
  {
    id: 4,
    name: "S-Series Comfort Chair",
    originalPrice: 400,
    discountedPrice: 375,
    discount: 25,
    rating: 5,
    reviews: 99,
    image: "/ui/home/chair.svg",
    description: "Ergonomic office chair designed for maximum comfort during long work sessions.",
    category: "Furniture",
    stock: 40
  },
  {
    id: 5,
    name: "S-Series Comfort Chair",
    originalPrice: 400,
    discountedPrice: 375,
    discount: 25,
    rating: 5,
    reviews: 99,
    image: "/ui/home/chair.svg",
    description: "Ergonomic office chair designed for maximum comfort during long work sessions.",
    category: "Furniture",
    stock: 35
  },
  {
    id: 6,
    name: "Gaming Headset Pro",
    originalPrice: 200,
    discountedPrice: 150,
    discount: 25,
    rating: 4.5,
    reviews: 65,
    image: "/ui/home/headset.svg",
    description: "Professional gaming headset with noise cancellation and crystal clear audio.",
    category: "Electronics",
    stock: 60
  },
  // Best Selling Products
  {
    id: 7,
    name: "The north coat",
    originalPrice: 360,
    discountedPrice: 260,
    discount: 28,
    rating: 5,
    reviews: 65,
    image: "/ui/homepage/coat.svg",
    description: "Premium winter coat with excellent insulation and stylish design.",
    category: "Fashion",
    stock: 45
  },
  {
    id: 8,
    name: "Gucci duffle bag",
    originalPrice: 1160,
    discountedPrice: 960,
    discount: 17,
    rating: 5,
    reviews: 65,
    image: "/ui/homepage/bag.svg",
    description: "Luxury duffle bag made from premium materials with elegant design.",
    category: "Fashion",
    stock: 20
  },
  {
    id: 9,
    name: "RGB liquid CPU Cooler",
    originalPrice: 170,
    discountedPrice: 160,
    discount: 6,
    rating: 5,
    reviews: 65,
    image: "/ui/homepage/cooler.svg",
    description: "Advanced CPU cooling solution with RGB lighting and efficient heat dissipation.",
    category: "Electronics",
    stock: 30
  },
  {
    id: 10,
    name: "Small BookSelf",
    originalPrice: 360,
    discountedPrice: 360,
    discount: 0,
    rating: 5,
    reviews: 65,
    image: "/ui/homepage/bookshelf.svg",
    description: "Compact bookshelf perfect for organizing books and decorative items.",
    category: "Furniture",
    stock: 25
  },
  // New Releases Products
  {
    id: 11,
    name: "Breed Dry Dog Food",
    originalPrice: 100,
    discountedPrice: 100,
    discount: 0,
    rating: 5,
    reviews: 35,
    image: "/ui/newrelease/breed.svg",
    description: "Premium dry dog food with balanced nutrition for all breeds.",
    category: "Pet Supplies",
    stock: 100
  },
  {
    id: 12,
    name: "CANON EOS DSLR Camera",
    originalPrice: 360,
    discountedPrice: 360,
    discount: 0,
    rating: 5,
    reviews: 95,
    image: "/ui/newrelease/dslr.svg",
    description: "Professional DSLR camera with high-resolution sensor and advanced features.",
    category: "Electronics",
    stock: 15
  },
  {
    id: 13,
    name: "ASUS FHD Gaming Laptop",
    originalPrice: 700,
    discountedPrice: 700,
    discount: 0,
    rating: 5,
    reviews: 325,
    image: "/ui/newrelease/laptopfhd.svg",
    description: "High-performance gaming laptop with FHD display and powerful graphics.",
    category: "Electronics",
    stock: 20
  },
  {
    id: 14,
    name: "Curology Product Set",
    originalPrice: 500,
    discountedPrice: 500,
    discount: 0,
    rating: 5,
    reviews: 145,
    image: "/ui/newrelease/Copa_Sense 1.svg",
    description: "Complete skincare set with personalized formulas for your skin type.",
    category: "Beauty",
    stock: 50
  },
  {
    id: 15,
    name: "Kids Electric Car",
    originalPrice: 960,
    discountedPrice: 960,
    discount: 0,
    rating: 5,
    reviews: 65,
    image: "/ui/newrelease/toy.svg",
    description: "Fun electric car for kids with safe controls and durable construction.",
    category: "Toys",
    stock: 30
  },
  {
    id: 16,
    name: "Jr. Zoom Soccer Cleats",
    originalPrice: 1160,
    discountedPrice: 1160,
    discount: 0,
    rating: 5,
    reviews: 35,
    image: "/ui/newrelease/Copa_Sense 1.svg",
    description: "Professional soccer cleats designed for junior players with excellent grip.",
    category: "Sports",
    stock: 40
  },
  {
    id: 17,
    name: "GP11 Shooter USB Gamepad",
    originalPrice: 660,
    discountedPrice: 660,
    discount: 0,
    rating: 5,
    reviews: 55,
    image: "/ui/newrelease/usb.svg",
    description: "USB gaming controller with responsive buttons and ergonomic design.",
    category: "Gaming",
    stock: 35
  },
  {
    id: 18,
    name: "Quilted Satin Jacket",
    originalPrice: 660,
    discountedPrice: 660,
    discount: 0,
    rating: 5,
    reviews: 55,
    image: "/ui/newrelease/jacket.svg",
    description: "Elegant quilted satin jacket perfect for any occasion.",
    category: "Fashion",
    stock: 25
  }
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, cart } = useCart();
  const { showSuccess } = useToast();
  const [product, setProduct] = useState<StaticProduct | Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [error, setError] = useState('');
  const [isStaticProduct, setIsStaticProduct] = useState(false);

  const [quantity, setQuantity] = useState(1);

  // Check if product is already in cart
  const isInCart = product ? cart.some(item => item.id === (isStaticProduct ? (product as StaticProduct).id : parseInt((product as Product).id!))) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // First, check if it's a static product (numeric ID)
        const numericId = parseInt(id as string);
        if (!isNaN(numericId)) {
          const staticProduct = staticProducts.find(p => p.id === numericId);
          if (staticProduct) {
            setProduct(staticProduct);
            setIsStaticProduct(true);
            setLoading(false);
            return;
          }
        }
        
        // If not found in static products, try Firebase (string ID)
        const productData = await getProduct(id as string);
        if (productData) {
          setProduct(productData);
          setIsStaticProduct(false);
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

  const handleBackClick = () => {
    // Check if we came from products page with pagination
    const referrer = document.referrer;
    if (referrer.includes('/products')) {
      router.back();
    } else {
      router.push('/products');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <button 
            onClick={handleBackClick}
            className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors"
          >
            <FaArrowLeft className="inline mr-2" />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Create FavoriteItem for the main product
  const mainProductFavoriteItem: FavoriteItem = {
    id: isStaticProduct ? (product as StaticProduct).id : parseInt((product as Product).id!),
    name: product.name,
    image: isStaticProduct ? (product as StaticProduct).image : (product as Product).imageUrl || '/ui/homepage/chair.svg',
    price: isStaticProduct ? (product as StaticProduct).discountedPrice : (product as Product).price,
    originalPrice: isStaticProduct ? (product as StaticProduct).originalPrice : (product as Product).price,
    discountedPrice: isStaticProduct ? (product as StaticProduct).discountedPrice : (product as Product).price,
    discount: isStaticProduct ? (product as StaticProduct).discount : 0,
    rating: isStaticProduct ? (product as StaticProduct).rating : 0,
    reviews: isStaticProduct ? (product as StaticProduct).reviews : 0
  };

  const handleAddToCart = () => {
    addToCart({
      id: isStaticProduct ? (product as StaticProduct).id : parseInt((product as Product).id!),
      name: product.name,
      price: isStaticProduct ? (product as StaticProduct).discountedPrice : (product as Product).price,
      quantity: quantity,
      image: isStaticProduct ? (product as StaticProduct).image : (product as Product).imageUrl || '/ui/homepage/chair.svg',
      originalPrice: isStaticProduct ? (product as StaticProduct).originalPrice : (product as Product).price,
      discountedPrice: isStaticProduct ? (product as StaticProduct).discountedPrice : (product as Product).price,
      discount: isStaticProduct ? (product as StaticProduct).discount : 0,
      rating: isStaticProduct ? (product as StaticProduct).rating : 0,
      reviews: isStaticProduct ? (product as StaticProduct).reviews : 0,
    });
    showSuccess('Product added to cart!');
  };

  // Get product details based on type
  const productImage = isStaticProduct ? (product as StaticProduct).image : (product as Product).imageUrl || '/ui/homepage/chair.svg';
  const productPrice = isStaticProduct ? (product as StaticProduct).discountedPrice : (product as Product).price;
  const productOriginalPrice = isStaticProduct ? (product as StaticProduct).originalPrice : (product as Product).price;
  const productDiscount = isStaticProduct ? (product as StaticProduct).discount : 0;
  const productRating = isStaticProduct ? (product as StaticProduct).rating : 0;
  const productReviews = isStaticProduct ? (product as StaticProduct).reviews : 0;
  const productDescription = isStaticProduct ? (product as StaticProduct).description : (product as Product).description;
  const productCategory = isStaticProduct ? (product as StaticProduct).category : (product as Product).category;
  const productStock = isStaticProduct ? (product as StaticProduct).stock : (product as Product).stock;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <button onClick={handleBackClick} className="hover:underline flex items-center gap-1">
          <FaArrowLeft className="w-3 h-3" />
          Back to Products
        </button>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {/* Left Image */}
        <div className="flex-1 relative">
          <Image
            src={productImage}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg border w-full h-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/ui/product/placeholder-image.svg';
            }}
          />
          {/* Discount Badge */}
          {productDiscount > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{productDiscount}%
            </div>
          )}
          {/* Wishlist button for main product */}
          <div className="absolute top-4 right-4">
            <WishListButton item={mainProductFavoriteItem} />
          </div>
        </div>

        {/* Right Details */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">{product.name}</h1>

          {/* Rating */}
          {productRating > 0 && (
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Image
                  key={i}
                  src={i < Math.floor(productRating) ? "/ui/product/fullstar.svg" : "/ui/product/emptystar.svg"}
                  alt="star"
                  width={16}
                  height={16}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/ui/product/placeholder-image.svg';
                  }}
                />
              ))}
              <span className="text-gray-500 text-sm ml-1">({productReviews})</span>
            </div>
          )}

          {/* Stock Status */}
          <div className="flex items-center gap-2 mt-2">
            <span className={`${productStock && productStock > 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
              {productStock && productStock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            {productStock && productStock > 0 && (
              <span className="text-gray-500">({productStock} available)</span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-4">
            <p className="text-xl sm:text-2xl font-bold text-red-500">${productPrice}</p>
            {productDiscount > 0 && (
              <p className="text-gray-400 line-through">${productOriginalPrice}</p>
            )}
          </div>

          {/* Description */}
          {productDescription && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Description:</h3>
              <p className="text-gray-600">{productDescription}</p>
            </div>
          )}

          {/* Category */}
          {productCategory && (
            <div className="mt-4">
              <span className="text-gray-500">Category: </span>
              <span className="font-medium capitalize">{productCategory}</span>
            </div>
          )}

          {/* Quantity & Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
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
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={handleAddToCart}
                disabled={!productStock || productStock === 0 || isInCart}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  isInCart 
                    ? 'bg-green-500 text-white cursor-default' 
                    : !productStock || productStock === 0
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {isInCart ? 'Added to Cart' : !productStock || productStock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button 
                disabled={!productStock || productStock === 0}
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                Buy Now
              </button>
            </div>
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

      {/* Related Products Section - Only show for dynamic products */}
      {!isStaticProduct && (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
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
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/ui/product/placeholder-image.svg';
                          }}
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
                        <span className={`text-xs ${relatedProduct.stock && relatedProduct.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {relatedProduct.stock && relatedProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
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
      )}
    </div>
  );
}
