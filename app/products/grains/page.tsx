'use client';

export default function GrainsPage() {
  const grains = [
    { name: 'Brown Rice', price: '₹60/kg' },
    { name: 'Whole Wheat', price: '₹45/kg' },
    { name: 'Millets Mix', price: '₹70/kg' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Grains</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {grains.map((grain) => (
          <div key={grain.name} className="bg-white p-4 shadow-md rounded-xl">
            <div className="h-32 bg-gray-100 rounded mb-4 flex items-center justify-center text-gray-500">
              Image Placeholder
            </div>
            <h2 className="text-xl font-semibold">{grain.name}</h2>
            <p className="text-green-700">{grain.price}</p>
            <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}