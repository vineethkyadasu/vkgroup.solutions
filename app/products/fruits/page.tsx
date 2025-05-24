'use client';

import Image from 'next/image';

export default function FruitsPage() {
  const fruits = [
    { name: 'Organic Mangoes', price: '₹150/kg', image: '/images/mango.jpg' },
    { name: 'Natural Bananas', price: '₹50/dozen', image: '/images/bananas.jpg' },
    { name: 'Fresh Papayas', price: '₹40/kg', image: '/images/papaya.jpg' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Fruits</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {fruits.map((fruit) => (
          <div key={fruit.name} className="bg-white p-4 shadow-md rounded-xl">
            <Image
              src={fruit.image}
              alt={fruit.name}
              width={400}
              height={300}
              className="rounded-xl"
            />
            <h2 className="text-xl font-semibold mt-4">{fruit.name}</h2>
            <p className="text-green-700">{fruit.price}</p>
            <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}