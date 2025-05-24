'use client';

import Image from 'next/image';

export default function VegetablesPage() {
  const vegetables = [
    { name: 'Organic Tomatoes', price: '₹30/kg', image: '/images/tomatoes.jpg' },
    { name: 'Fresh Carrots', price: '₹40/kg', image: '/images/carrots.jpg' },
    { name: 'Green Beans', price: '₹35/kg', image: '/images/beans.jpg' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Vegetables</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vegetables.map((veg) => (
          <div key={veg.name} className="bg-white p-4 shadow-md rounded-xl">
            <Image
              src={veg.image}
              alt={veg.name}
              width={400}
              height={300}
              className="rounded-xl"
            />
            <h2 className="text-xl font-semibold mt-4">{veg.name}</h2>
            <p className="text-green-700">{veg.price}</p>
            <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}