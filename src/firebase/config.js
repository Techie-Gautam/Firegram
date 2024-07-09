import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA99-3xJzrK6joZy6-f1lI_g75LrY9eezw",
  authDomain: "react-firegram-fc402.firebaseapp.com",
  projectId: "react-firegram-fc402",
  storageBucket: "react-firegram-fc402.appspot.com",
  messagingSenderId: "575278167920",
  appId: "1:575278167920:web:4cdf507ae73a39dad341b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);

export { projectStorage, projectFirestore, serverTimestamp };
