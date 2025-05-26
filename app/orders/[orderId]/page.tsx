'use client';

import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useParams } from 'next/navigation';

const statusColors: Record<string, string> = {
  pending: 'text-yellow-600',
  confirmed: 'text-blue-600',
  'in-transit': 'text-orange-600',
  delivered: 'text-green-600',
};

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (!orderId) return;
    const unsub = onSnapshot(doc(db, 'orders', orderId as string), (snap) => {
      setOrder(snap.data());
    });
    return () => unsub();
  }, [orderId]);

  if (!order) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-green-800">Order Details</h1>
      <p><strong>Order ID:</strong> {orderId}</p>
      <p><strong>Date:</strong> {new Date(order.createdAt.seconds * 1000).toLocaleString()}</p>
      <p className={`mt-2 font-semibold ${statusColors[order.status]}`}>Status: {order.status}</p>

      <hr className="my-4" />

      {order.name && <p>👤 Name: {order.name}</p>}
      {order.phone && <p>📞 Phone: {order.phone}</p>}
      {order.address && <p>📍 Address: {order.address}</p>}

      <hr className="my-4" />

      <h2 className="font-bold mb-2">Items:</h2>
      <ul className="list-disc pl-6">
        {order.items.map((item: any, idx: number) => (
          <li key={idx}>{item.name} — {item.price}</li>
        ))}
      </ul>
    </div>
  );
}