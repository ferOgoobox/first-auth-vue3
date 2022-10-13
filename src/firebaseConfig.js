import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 
const firebaseConfig = {
  apiKey: "AIzaSyD8R2lt0p6kaCblRmTiNA30tnIVjkXVdxY",
  authDomain: "vue3-firebase-fa5b0.firebaseapp.com",
  projectId: "vue3-firebase-fa5b0",
  storageBucket: "vue3-firebase-fa5b0.appspot.com",
  messagingSenderId: "856919907744",
  appId: "1:856919907744:web:6d4f7d03b24c511871d8c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();

export { auth }
