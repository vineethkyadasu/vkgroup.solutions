'use client';

import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useCart } from '../../../context/CartContext';
import Image from 'next/image';

export default function FruitsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, 'fruits'));
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Fruits</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 shadow-md rounded-xl">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={300}
              className="rounded-xl"
            />
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-green-700">{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}