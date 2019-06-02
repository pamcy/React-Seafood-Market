import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';
require('dotenv').config();

// Initialize Firebase
const firebaseApp = firebase.initializeApp({
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "react-seafood-dashboard.firebaseapp.com",
  databaseURL: "https://react-seafood-dashboard.firebaseio.com",
});

// Create Rebase binding
const base = Rebase.createClass(firebaseApp.database());

// Named export
export { firebaseApp };

// Default export
export default base;
