import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWAceEZOZDtf5q_tYAipuOXoiov6bFm0c",
  authDomain: "watch-store-ccdca.firebaseapp.com",
  projectId: "watch-store-ccdca",
  storageBucket: "watch-store-ccdca.firebasestorage.app",
  messagingSenderId: "521212287315",
  appId: "1:521212287315:web:48c4a8343fd899ed69e9a6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
