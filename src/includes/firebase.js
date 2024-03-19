import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbeAv7SBZlRrV3vN18mkqwpISooot6l6s",
  authDomain: "music-d8c94.firebaseapp.com",
  projectId: "music-d8c94",
  storageBucket: "music-d8c94.appspot.com",
  messagingSenderId: "375515636710",
  appId: "1:375515636710:web:f5db92f0793b4057d16c27",
};

//initialize firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error ${error.code}`);
});

const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");

export {
  auth,
  db,
  usersCollection,
  storage,
  songsCollection,
  commentsCollection,
};
