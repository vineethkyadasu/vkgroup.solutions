'use client';

import { useCart } from '../../context/CartContext';
import { db } from '../../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [codAccepted, setCodAccepted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const router = useRouter();

  const totalAmount = items.reduce((sum, item) => sum + parseInt(item.price), 0);

  const handlePlaceOrder = async () => {
    if (items.length === 0) return alert('Your cart is empty');
    if (!name || !phone || !address) return alert('Please fill in all customer details.');
    if (!codAccepted) return alert('Please select Cash on Delivery to proceed.');

    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        items,
        customer: { name, phone, address },
        createdAt: Timestamp.now(),
        status: 'pending',
      });
      clearCart();
      router.push(`/orders/${docRef.id}`);
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
              <div key={idx} className="flex justify-between items-center border-b pb-2">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
            <div className="text-right font-semibold text-green-800">
              Total: ₹{totalAmount}
            </div>
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
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={codAccepted}
                onChange={() => setCodAccepted(!codAccepted)}
              />
              <span>Cash on Delivery (COD)</span>
            </label>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading || !codAccepted}
            className={`w-full px-4 py-2 rounded text-white ${
              codAccepted ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </>
      )}
    </div>
  );
}