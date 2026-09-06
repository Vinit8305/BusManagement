import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBzZ5fNhif7LvbmKicx_SbsLJ8ZG1SQaNc",
    authDomain: "busmanagement-ab1c6.firebaseapp.com",
    projectId: "busmanagement-ab1c6",
    storageBucket: "busmanagement-ab1c6.firebasestorage.app",
    messagingSenderId: "506274884014",
    appId: "1:506274884014:web:24b58adcf6eccb50e4c03f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);