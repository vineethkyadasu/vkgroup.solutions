'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const ref = doc(db, 'orders', orderId as string);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setOrder(snapshot.data());
      }
    };
    fetchOrder();
  }, [orderId]);

  const formatDate = (timestamp: any) =>
    timestamp?.toDate().toLocaleString('en-IN');

  const groupItems = (items: any[]) => {
    const grouped: { [key: string]: { name: string; price: string; qty: number } } = {};
    for (const item of items) {
      if (grouped[item.name]) {
        grouped[item.name].qty += 1;
      } else {
        grouped[item.name] = { name: item.name, price: item.price, qty: 1 };
      }
    }
    return Object.values(grouped);
  };

  const calculateTotal = (items: any[]) =>
    items.reduce((acc, item) => acc + parseFloat(item.price) * item.qty, 0);

  if (!order) return <p className="p-6">Loading...</p>;

  const groupedItems = groupItems(order.items);
  const total = calculateTotal(groupedItems);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Order Details</h1>
      <p><strong>Order ID:</strong> {orderId}</p>
      <p><strong>📅 Date:</strong> {formatDate(order.createdAt)}</p>

      {order.customer && (
        <div className="my-4 space-y-1">
          <p><strong>👤 Name:</strong> {order.customer.name}</p>
          <p><strong>📞 Phone:</strong> {order.customer.phone}</p>
          <p><strong>📍 Address:</strong> {order.customer.address}</p>
        </div>
      )}

      <h2 className="text-xl font-semibold mt-6 mb-2">Items:</h2>
      <ul className="space-y-2">
        {groupedItems.map((item, i) => (
          <li key={i}>
            {item.name} (x{item.qty}) — ₹{parseFloat(item.price) * item.qty}
          </li>
        ))}
      </ul>

      <p className="font-bold mt-4">🧾 Total: ₹{total}</p>

      <p className="mt-4 text-green-800 font-semibold">Status: {order.status}</p>
    </div>
  );
}