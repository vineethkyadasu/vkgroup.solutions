'use client';

import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';

const statusFlow = ['pending', 'confirmed', 'in-transit', 'delivered'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const orderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(orderList);
    });

    return () => unsubscribe();
  }, []);

  const advanceStatus = async (orderId: string, currentStatus: string) => {
    const currentIndex = statusFlow.indexOf(currentStatus);
    const nextStatus = statusFlow[currentIndex + 1];

    if (!nextStatus) {
      alert('✅ Already delivered!');
      return;
    }

    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: nextStatus,
      });
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('❌ Could not update status');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Customer Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-4 rounded mb-4 shadow">
            <p className="text-sm text-gray-500">Order ID: {order.id}</p>
            <p className="text-sm text-gray-600">📅 {order.createdAt?.toDate?.().toLocaleString()}</p>

            {order.name && (
              <p>👤 Name: {order.name}</p>
            )}
            {order.phone && (
              <p>📞 Phone: {order.phone}</p>
            )}
            {order.address && (
              <p>📍 Address: {order.address}</p>
            )}

            <ul className="mt-2">
              {order.items?.map((item: any, idx: number) => (
                <li key={idx}>
                  {item.name} — {item.price}
                </li>
              ))}
            </ul>

            <div className="mt-2 flex items-center gap-4">
              <p className="text-sm font-semibold">Status: {order.status}</p>
              <button
                onClick={() => advanceStatus(order.id, order.status)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Next Status
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}