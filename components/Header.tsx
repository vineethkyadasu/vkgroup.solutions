'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function Header() {
  const { items } = useCart();

  return (
    <header className="flex justify-between items-center p-4 bg-green-700 text-white shadow-md">
      <Link href="/" className="text-2xl font-bold">
        Rythu Varadi
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/products/fruits" className="hover:underline">
          Fruits
        </Link>
        <Link href="/products/vegetables" className="hover:underline">
          Vegetables
        </Link>
        <Link href="/products/grains" className="hover:underline">
          Grains
        </Link>

        <Link href="/cart" className="relative">
          <ShoppingCart className="w-6 h-6" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {items.length}
            </span>
          )}
        </Link>

        <Link
          href="/checkout"
          className="bg-white text-green-700 px-3 py-1 rounded font-medium hover:bg-green-100"
        >
          Checkout
        </Link>

        {/* ✅ THIS IS THE ADMIN LINK */}
        <Link
          href="/admin"
          className="text-sm underline hover:text-gray-300 ml-2"
        >
          Admin
        </Link>
      </div>
    </header>
  );
}