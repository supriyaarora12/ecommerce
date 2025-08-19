import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Product Details - Exclusive',
  description: 'View detailed information about the product',
};

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      {/* Breadcrumb (always visible on product pages) */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500">
        <Link href="/" className="hover:underline">Home</Link> / 
        <span className="ml-1">Product Details</span>
      </div>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 pb-12">
        {children}
      </main>
    </div>
  );
}
