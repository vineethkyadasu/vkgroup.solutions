'use client';

import { useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export default function AdminUploadPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: 'fruits',
    image: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const user = formData.get('username');
    const pass = formData.get('password');
    if (user === 'admin' && pass === '1234') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const collectionRef = collection(db, form.category);

      // 🔍 Check for duplicate product name in the selected category
      const q = query(collectionRef, where('name', '==', form.name));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        alert('❌ Product with this name already exists in this category!');
        return;
      }

      // ✅ Upload if no duplicate found
      await addDoc(collectionRef, form);
      alert('✅ Product uploaded to Firebase!');
      setForm({ name: '', price: '', category: 'fruits', image: '' });
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Failed to upload. Check console for details.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <button className="bg-green-700 text-white px-4 py-2 rounded w-full">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Upload New Product</h1>
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name || ''}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price (₹/kg or ₹/dozen)"
          value={form.price || ''}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <select
          name="category"
          value={form.category || 'fruits'}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        >
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
          <option value="grains">Grains</option>
        </select>
        <input
          type="text"
          name="image"
          placeholder="Image URL (e.g. /images/mango.jpg)"
          value={form.image || ''}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded">
          Upload Product
        </button>
      </form>
    </div>
  );
}