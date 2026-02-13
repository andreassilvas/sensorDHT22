// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABfqkLDamFAyOjVqy_g0srz3fNscqSlf8",
  authDomain: "pi-dht22-00sx.firebaseapp.com",
  databaseURL: "https://pi-dht22-00sx-default-rtdb.firebaseio.com",
  projectId: "pi-dht22-00sx",
  storageBucket: "pi-dht22-00sx.firebasestorage.app",
  messagingSenderId: "964305118373",
  appId: "1:964305118373:web:462713b5bf57b6bf51994c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);