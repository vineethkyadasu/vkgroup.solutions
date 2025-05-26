'use client';

import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

interface Order {
  id: string;
  createdAt: { seconds: number };
  items: { name: string; price: string }[];
  status: string;
  customer?: {
    name?: string;
    phone?: string;
    address?: string;
  };
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      setOrders(fetched);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Customer Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border p-4 rounded-xl mb-4 bg-white shadow-md"
          >
            <p className="text-sm text-gray-500 mb-2">
              <strong>Order ID:</strong> {order.id}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              📅{' '}
              {new Date(order.createdAt.seconds * 1000).toLocaleString()}
            </p>

            {order.customer && (
              <div className="mb-2 text-sm text-gray-700">
                👤 <strong>Name:</strong> {order.customer.name || 'N/A'} <br />
                📞 <strong>Phone:</strong> {order.customer.phone || 'N/A'} <br />
                📍 <strong>Address:</strong> {order.customer.address || 'N/A'}
              </div>
            )}

            <div className="mb-2">
              {order.items.map((item, idx) => (
                <p key={idx}>
                  {item.name} — {item.price}
                </p>
              ))}
            </div>
            <p className="text-sm text-green-700 font-medium">
              Status: {order.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}