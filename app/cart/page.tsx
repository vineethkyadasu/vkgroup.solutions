'use client';

import { useCart } from '../../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeFromCart } = useCart();

  const groupedItems = items.reduce((acc: any, item) => {
    if (!acc[item.name]) {
      acc[item.name] = { ...item, qty: 0 };
    }
    acc[item.name].qty += 1;
    return acc;
  }, {});

  const groupedList = Object.values(groupedItems);
  const totalPrice = groupedList.reduce(
    (sum: number, item: any) => sum + parseFloat(item.price) * item.qty,
    0
  );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-green-800">Your Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {groupedList.map((item: any, idx: number) => (
              <li key={idx} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{item.name} (x{item.qty})</p>
                  <p className="text-gray-600">
                    ₹{parseFloat(item.price)} × {item.qty} = ₹
                    {parseFloat(item.price) * item.qty}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.name)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p className="text-xl font-bold">Total: ₹{totalPrice}</p>

            <Link
              href="/checkout"
              className="mt-4 inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}