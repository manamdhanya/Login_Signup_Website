import { initializeApp } from "firebase/app"; 

const firebaseConfig = {
  apiKey: "AIzaSyAlTdNsog6hra-XqFkkiBqDUuLQCTY5czo",
  authDomain: "login-authentication-b1400.firebaseapp.com",
  projectId: "login-authentication-b1400",
  storageBucket: "login-authentication-b1400.appspot.com", 
  messagingSenderId: "524605151804",
  appId: "1:524605151804:web:01725f87424f6c27f70139",
  databaseURL: "https://login-authentication-b1400-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);
