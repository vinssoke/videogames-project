import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyCh9Y0Cbekk2wm5QH5Ehz7-qZf65DrnJ4U",
  authDomain: "fir-tibu.firebaseapp.com",
  databaseURL: "https://fir-tibu-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-tibu",
  storageBucket: "fir-tibu.firebasestorage.app",
  messagingSenderId: "899507923230",
  appId: "1:899507923230:web:146ef71885a240ef32c10f"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);