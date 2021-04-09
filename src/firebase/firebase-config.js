import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAuw9UxL7QN_jM_cULOYjZ2axDtOVHWmB8",
    authDomain: "react-app-journal-12010.firebaseapp.com",
    projectId: "react-app-journal-12010",
    storageBucket: "react-app-journal-12010.appspot.com",
    messagingSenderId: "836362880474",
    appId: "1:836362880474:web:6295da6c34116f1f156ce3"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}