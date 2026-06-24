import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDDDYXQMn27v1bnvDwPXKmC7MhTv0bjfF0",
  authDomain: "carbon-decorator-jqk4z.firebaseapp.com",
  projectId: "carbon-decorator-jqk4z",
  storageBucket: "carbon-decorator-jqk4z.firebasestorage.app",
  messagingSenderId: "218887630232",
  appId: "1:218887630232:web:3c5e5ee32fd924a2ee4fed"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Use the custom database ID provided in config
export const db = getFirestore(app, "ai-studio-ac411205-3c73-420a-bf79-f3ece460de7e");

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();
