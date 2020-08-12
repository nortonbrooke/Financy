import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore;
const db = firestore();

const API = {
  authenticate: {
    signIn: (data) => {
      const { email, password } = data;
      return auth.signInWithEmailAndPassword(email, password);
    },

    signUp: (data) => {
      const { email, password } = data;
      return auth.createUserWithEmailAndPassword(email, password);
    },

    signOut: () => {
      return auth.signOut();
    },

    isSignedIn: (callback) => {
      return auth.onAuthStateChanged(callback);
    },
  },
  emails: {
    sendPasswordResetEmail: (data) => {
      const { email } = data;
      return auth.sendPasswordResetEmail(email);
    },
  },
  users: {
    create: (data) => {
      const { name, email } = data;
      const doc = {
        name: name,
        email: email,
        joined: firestore.Timestamp.fromDate(new Date()),
      };
      return db.collection("users").add(doc);
    },
  },
};

export default API;
