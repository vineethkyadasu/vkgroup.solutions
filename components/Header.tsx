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

      <div className="flex items-center gap-6">
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
      </div>
    </header>
  );
}