// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, type RecaptchaVerifier } from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj-mQaikXzAzW0ZYqHK0Pmm4eDR6aXzQw",
  authDomain: "sendertest-dd7a5.firebaseapp.com",
  projectId: "sendertest-dd7a5",
  storageBucket: "sendertest-dd7a5.firebasestorage.app",
  messagingSenderId: "996704318980",
  appId: "1:996704318980:web:edd91ca108eed0d125e751"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);