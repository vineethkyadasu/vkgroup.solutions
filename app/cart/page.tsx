'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';

export default function CartPage() {
  const { items, removeFromCart } = useCart();

  const getTotal = () => {
    return items.reduce((total, item) => {
      const numeric = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
      return total + numeric;
    }, 0);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="flex gap-4 items-center bg-white p-4 shadow rounded-xl">
              <Image src={item.image} alt={item.name} width={100} height={80} className="rounded" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-green-700">{item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.name)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-xl font-semibold text-right mt-6">
            Total: ₹{getTotal()}
          </div>
        </div>
      )}
    </div>
  );
}