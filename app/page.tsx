'use client';

import Link from 'next/link';

export default function HomePage() {
  const items = [
    {
      title: 'Vegetables',
      href: '/products/vegetables',
      desc: 'Fresh, organic vegetables directly from farmers.',
    },
    {
      title: 'Fruits',
      href: '/products/fruits',
      desc: 'Juicy, chemical-free fruits grown naturally.',
    },
    {
      title: 'Grains',
      href: '/products/grains',
      desc: 'Healthy and wholesome grains sourced directly.',
    },
  ];

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-green-800">Rythu Varadi</h1>
        <p className="text-lg text-green-600 mt-2">
          Organic Products Direct from Farmers to Your Doorstep
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.title} className="bg-white rounded-xl shadow-md p-4">
            <div className="w-full h-40 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
              Image Placeholder
            </div>
            <h2 className="text-xl font-semibold mt-4">{item.title}</h2>
            <p className="text-gray-600">{item.desc}</p>
            <Link href={item.href}>
              <div className="mt-4">
                <div className="w-full bg-green-600 text-white py-2 rounded-md text-center hover:bg-green-700 cursor-pointer">
                  Shop Now
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}