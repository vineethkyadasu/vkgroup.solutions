'use client';

import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Customer Orders</h1>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded-lg shadow-sm bg-white"
            >
              <h2 className="font-semibold mb-2">Order ID: {order.id}</h2>
              <ul className="list-disc list-inside text-sm text-gray-700 mb-2">
                {order.items.map((item: any, idx: number) => (
                  <li key={idx}>
                    {item.name} — {item.price}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-500">
                Status: {order.status} |{' '}
                {order.createdAt?.toDate
                  ? order.createdAt.toDate().toLocaleString()
                  : 'No Date'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}