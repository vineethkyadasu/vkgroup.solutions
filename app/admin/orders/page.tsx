'use client';

import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Customer Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="mb-6 border p-4 rounded shadow-sm bg-white">
            <h2 className="font-bold text-lg mb-1">Order ID: {order.id}</h2>
            <p className="text-sm mb-1">📅 {order.createdAt?.toDate().toLocaleString()}</p>
            <p className="text-sm mb-1">👤 {order.customer?.name}</p>
            <p className="text-sm mb-1">📞 {order.customer?.phone}</p>
            <p className="text-sm mb-2">📍 {order.customer?.address}</p>

            <div className="space-y-1 border-t pt-2">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>

            <div className="text-sm text-gray-600 mt-2">Status: {order.status}</div>
          </div>
        ))
      )}
    </div>
  );
}