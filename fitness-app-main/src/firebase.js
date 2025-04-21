import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCoj84KUfX5av3KFRejzygKTNJJS6BHiGA",
    authDomain: "hcfw-ebde1.firebaseapp.com",
    projectId: "hcfw-ebde1",
    storageBucket: "hcfw-ebde1.firebasestorage.app",
    messagingSenderId: "271942911113",
    appId: "1:271942911113:web:c5c560da013b48def7b258"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);