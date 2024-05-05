import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDF6Zs07l-7LUORr3Y-GMMHNZgAaKlV13w",
    authDomain: "finance-service-2774d.firebaseapp.com",
    projectId: "finance-service-2774d",
    storageBucket: "finance-service-2774d.appspot.com",
    messagingSenderId: "1026305844420",
    appId: "1:1026305844420:web:9d772677089389fb61d591",
    measurementId: "G-41J63K4P21"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);