import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";



const firebaseConfig = {

    apiKey: "AIzaSyAeba1dtYGJlKz2siDwBiOYF5K9fucaq4E",
  
    authDomain: "newswebsite-168ce.firebaseapp.com",
  
    projectId: "newswebsite-168ce",
  
    storageBucket: "newswebsite-168ce.appspot.com",
  
    messagingSenderId: "746581325566",
  
    appId: "1:746581325566:web:cbf4c0dcce437c60d717af"

    
  
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);



export {auth, db, storage};


  