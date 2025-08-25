'use client';

import Link from 'next/link';

export default function TestProductsPage() {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Product Navigation Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Static Products */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Static Products (Should Work)</h2>
          <div className="space-y-2">
            <Link href="/product/1" className="block p-3 border rounded hover:bg-gray-50">
              Product 1 - HAVIT HV-G92 Gamepad
            </Link>
            <Link href="/product/2" className="block p-3 border rounded hover:bg-gray-50">
              Product 2 - AK-900 Wired Keyboard
            </Link>
            <Link href="/product/3" className="block p-3 border rounded hover:bg-gray-50">
              Product 3 - IPS LCD Gaming Monitor
            </Link>
            <Link href="/product/4" className="block p-3 border rounded hover:bg-gray-50">
              Product 4 - S-Series Comfort Chair
            </Link>
            <Link href="/product/5" className="block p-3 border rounded hover:bg-gray-50">
              Product 5 - Gaming Headset Pro
            </Link>
          </div>
        </div>

        {/* Dynamic Products */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Dynamic Products (Firebase)</h2>
          <div className="space-y-2">
            <p className="text-gray-600">These will work if you have seeded your Firebase database.</p>
            <p className="text-gray-600">Run the seed script to populate Firebase with products.</p>
            <Link href="/products" className="block p-3 border rounded hover:bg-gray-50 text-blue-600">
              View All Products Page
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Click on any static product link above - these should work immediately</li>
          <li>For dynamic products, make sure you wiill run the seed script: <code className="bg-gray-200 px-1 rounded">npx tsx seedProduct.ts</code></li>
          <li>Check the browser console for any errors</li>
          <li>If you see Product Not Found, it means the product ID does not  exist in the database</li>
        </ol>
      </div>
    </div>
  );
}
