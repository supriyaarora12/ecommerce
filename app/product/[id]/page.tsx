'use client';

import { useParams } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaStar, FaTruck, FaUndoAlt, FaHeart, FaEye } from 'react-icons/fa';
import { useToast } from '../../context/ToastContext';

const products = [
  {
    id: '1',
    name: 'Havic HV G-92 Gamepad',
    price: 192,
    oldPrice: 220,
    stock: true,
    rating: 4.8,
    reviews: 500,
    description:
      'Playstation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble-free install & mess free removal Pressure sensitive.',
    colors: ['#000000', '#ffffff', '#ff0000'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/ui/productdetail/i1.svg',
      '/ui/productdetail/i2.svg',
      '/ui/productdetail/i3.svg',
      '/ui/productdetail/i4.svg',
    ],
    related: [
      {
        id: '2',
        name: 'HAVIT HV-G92 Gamepad',
        price: 120,
        oldPrice: 160,
        discount: 40,
        rating: 4,
        reviews: 88,
        image: '/ui/home/gampet.svg',
      },
      {
        id: '3',
        name: 'AK-900 Wired Keyboard',
        price: 960,
        oldPrice: 1160,
        discount: 35,
        rating: 4,
        reviews: 75,
        image: '/ui/home/keyboard.svg',
      },
      {
        id: '4',
        name: 'IPS LCD Gaming Monitor',
        price: 370,
        oldPrice: 400,
        discount: 30,
        rating: 4,
        reviews: 99,
        image: '/ui/home/monitor.svg',
      },
      {
        id: '5',
        name: 'RGB Liquid CPU Cooler',
        price: 160,
        oldPrice: 170,
        discount: 6,
        rating: 4,
        reviews: 65,
        image: '/ui/home/cpu.svg',
      },
    ],
  },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showSuccess } = useToast();
  const product = products.find((p) => p.id === id);

  const [mainImage, setMainImage] = useState(product?.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);

  if (!product) {
    return <div className="max-w-7xl mx-auto p-8">Product not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:underline">Home</Link> / <span>{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Images */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4">
            {product.images.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={product.name}
                width={80}
                height={80}
                className={`cursor-pointer border rounded-md transition-all duration-200 ${mainImage === img ? 'border-red-500 ring-2 ring-red-300' : 'border-gray-200 hover:border-gray-400'}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1">
            <Image
              src={mainImage || ''}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg border"
            />
          </div>
        </div>

        {/* Right Details */}
        <div>
          <h1 className="text-3xl font-semibold">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-gray-500">({product.reviews} Reviews)</span>
            {product.stock && <span className="text-green-500 ml-4">In Stock</span>}
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-4">
            <p className="text-2xl font-bold text-red-500">${product.price}</p>
            <p className="line-through text-gray-400">${product.oldPrice}</p>
            <span className="text-green-500 font-medium">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-600">{product.description}</p>

          {/* Colors */}
          <div className="mt-6">
            <span className="font-medium">Colours:</span>
            <div className="flex gap-2 mt-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${selectedColor === color ? 'border-red-500 ring-2 ring-red-300' : 'border-gray-300 hover:border-gray-500'}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <span className="font-medium">Size:</span>
            <div className="flex gap-2 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition-all duration-200 ${selectedSize === size ? 'bg-red-500 text-white border-red-500' : 'border-gray-300 hover:border-gray-500'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Buttons */}
          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center border rounded-md">
              <button
                className="px-3 py-2"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-3 py-2"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                addToCart({
                  id: parseInt(product.id),
                  name: product.name,
                  price: product.price,
                  quantity: quantity,
                  image: product.images[0],
                  originalPrice: product.oldPrice,
                  discountedPrice: product.price,
                  discount: Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100),
                  rating: product.rating,
                  reviews: product.reviews,
                });
              }}
              className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600"
            >
              Add to Cart
            </button>
            <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600">
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

      {/* Related Items */}
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-6 bg-red-500 rounded-sm"></div>
          <h2 className="text-lg font-semibold text-red-500">Related Item</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {product.related.map((rel, index) => (
            <div key={rel.id} className="relative border rounded-lg overflow-hidden group">
              {/* Discount Badge */}
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{rel.discount}%
              </span>
              {/* Icons */}
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                  <FaHeart className="text-gray-600" />
                </button>
                <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                  <FaEye className="text-gray-600" />
                </button>
              </div>

              {/* Product Image */}
              <Link href={`/product/${rel.id}`}>
                <Image src={rel.image} alt={rel.name} width={250} height={250} className="mx-auto mt-6" />
              </Link>

              {/* Add to Cart Button (only 2nd card in mockup) */}
              {index === 1 && (
                <button className="absolute bottom-20 left-0 w-full bg-black text-white py-2 opacity-0 group-hover:opacity-100 transition">
                  Add To Cart
                </button>
              )}

              {/* Product Info */}
              <div className="p-4 text-center">
                <h3 className="font-medium text-sm">{rel.name}</h3>
                <div className="flex justify-center items-center gap-2 mt-1">
                  <span className="text-red-500 font-bold">${rel.price}</span>
                  <span className="line-through text-gray-400 text-sm">${rel.oldPrice}</span>
                </div>

                {/* Stars + Reviews */}
                <div className="flex justify-center items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`h-4 w-4 ${i < rel.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-gray-500 text-sm">({rel.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
