// app/category/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../src/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

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

  useEffect(() => {
    async function fetchProducts() {
      const q = query(
        collection(db, "products"),
        where("category", "==", slug)
      );
      const querySnapshot = await getDocs(q);

      const items: Product[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as Product);
      });

      setProducts(items);
    }

    fetchProducts();
  }, [slug]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold capitalize">{slug} Collection</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {products.map((p) => (
          <div key={p.id} className="border rounded-lg shadow-md p-4">
            <img
              src={p.imageUrl}
              alt={p.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="mt-2 text-lg font-semibold">{p.name}</h2>
            <p className="text-gray-600">₹{p.price}</p>
            <button className="bg-black text-white px-4 py-2 mt-2 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
