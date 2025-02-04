// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAjlCmpoVVk0hiKWqm_zIk0YBZ4gOx8cQ",
    authDomain: "my-squad-a075a.firebaseapp.com",
    projectId: "my-squad-a075a",
    storageBucket: "my-squad-a075a.firebasestorage.app",
    messagingSenderId: "650532801718",
    appId: "1:650532801718:web:70db91c20f1ebfce0daa17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, onAuthStateChanged, signOut };