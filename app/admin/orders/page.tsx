'use client';

import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';

const STATUS_SEQUENCE = ['pending', 'confirmed', 'in-transit', 'delivered'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const snapshot = await getDocs(collection(db, 'orders'));
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrders(list);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const advanceStatus = async (id: string, currentStatus: string) => {
    const index = STATUS_SEQUENCE.indexOf(currentStatus);
    if (index < STATUS_SEQUENCE.length - 1) {
      const nextStatus = STATUS_SEQUENCE[index + 1];
      await updateDoc(doc(db, 'orders', id), { status: nextStatus });
      fetchOrders();
    }
  };

  const formatDate = (ts: Timestamp) =>
    ts.toDate().toLocaleString('en-IN');

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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Customer Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const groupedItems = groupItems(order.items);
            const total = calculateTotal(groupedItems);
            return (
              <div key={order.id} className="border rounded-lg p-4 shadow">
                <p className="text-sm text-gray-500">
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>📅</strong> {formatDate(order.createdAt)}
                </p>

                {order.customer && (
                  <div className="my-2 text-sm space-y-1">
                    <p><strong>👤 Name:</strong> {order.customer.name}</p>
                    <p><strong>📞 Phone:</strong> {order.customer.phone}</p>
                    <p><strong>📍 Address:</strong> {order.customer.address}</p>
                  </div>
                )}

                <ul className="mt-2 space-y-1">
                  {groupedItems.map((item, idx) => (
                    <li key={idx}>
                      {item.name} (x{item.qty}) — ₹{parseFloat(item.price) * item.qty}
                    </li>
                  ))}
                </ul>

                <p className="mt-2 font-bold">🧾 Total: ₹{total}</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-green-700 font-medium">
                    Status: {order.status}
                  </span>
                  {order.status !== 'delivered' && (
                    <button
                      onClick={() => advanceStatus(order.id, order.status)}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm"
                    >
                      Next Status
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}