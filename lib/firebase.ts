// lib/firebase.ts

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHkxDlJv-d_9spdo0ttoGOVAVsKkSlwjU",
  authDomain: "rythu-varadi.firebaseapp.com",
  projectId: "rythu-varadi",
  storageBucket: "rythu-varadi.appspot.com",
  messagingSenderId: "463084909102",
  appId: "1:463084909102:web:ae3801a830cb48dc76e5bf"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);