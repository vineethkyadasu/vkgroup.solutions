'use client';

import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface Order {
  id: string;
  items: { name: string; price: string }[];
  customer?: { name: string; phone: string };
  createdAt?: any;
  status?: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      setOrders(docs);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Customer Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded shadow-sm bg-white">
              <p className="text-gray-600 text-sm mb-1">Order ID: {order.id}</p>
              {order.customer && (
                <p className="text-green-700 font-medium mb-1">
                  👤 {order.customer.name} 📞 {order.customer.phone}
                </p>
              )}
              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Status: {order.status || 'pending'} |{' '}
                {order.createdAt?.toDate
                  ? new Date(order.createdAt.toDate()).toLocaleString()
                  : '—'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}