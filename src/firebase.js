import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_SIGNIN_API_KEY,
  authDomain: "citynect-6bd7b.firebaseapp.com",
  projectId: "citynect-6bd7b",
  storageBucket: "citynect-6bd7b.appspot.com",
  messagingSenderId: "1067015454862",
  appId: "1:1067015454862:web:a3c1d4363f8287f95d49df"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export {auth,provider};
export default app;