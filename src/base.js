import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "react-seafood-dashboard.firebaseapp.com",
  databaseURL: "https://react-seafood-dashboard.firebaseio.com",
});

// Create Rebase binding
const base = Rebase.createClass(firebaseApp.database());

// Named export
export { firebaseApp };

// Default export
export default base;
