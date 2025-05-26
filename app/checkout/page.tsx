'use client';

import { useCart } from '../../context/CartContext';
import { db } from '../../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useState } from 'react';

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!name || !phone || !address) {
      alert('Please fill in all customer details.');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'orders'), {
        items,
        customer: {
          name,
          phone,
          address,
        },
        createdAt: Timestamp.now(),
        status: 'pending',
      });
      clearCart();
      alert('✅ Order placed successfully!');
      setName('');
      setPhone('');
      setAddress('');
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
        <>
          <div className="space-y-4 mb-6">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <textarea
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            {loading ? 'Placing Order...' : 'Place Order (Cash on Delivery)'}
          </button>
        </>
      )}
    </div>
  );
}