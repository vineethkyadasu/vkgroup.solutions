'use client';

import { useCart } from '../../context/CartContext';
import { db } from '../../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useState } from 'react';

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({ name: '', phone: '' });

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!customer.name || !customer.phone) {
      alert('Please enter your name and phone number');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'orders'), {
        items,
        customer,
        createdAt: Timestamp.now(),
        status: 'pending',
      });
      clearCart();
      alert('✅ Order placed successfully!');
    } catch (error) {
      console.error('Order error:', error);
      alert('❌ Failed to place order. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-green-800">Checkout</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border px-4 py-2 rounded"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border px-4 py-2 rounded"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            required
          />

          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border-b pb-2"
            >
              <span>{item.name}</span>
              <span>{item.price}</span>
            </div>
          ))}

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 w-full"
          >
            {loading ? 'Placing Order...' : 'Place Order (Cash on Delivery)'}
          </button>
        </div>
      )}
    </div>
  );
}