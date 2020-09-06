import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
import { isNil } from 'lodash';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const API = {
  auth: {
    isSignedIn: () => !isNil(firebase.auth().currentUser),

    signIn: (data) => {
      const { email, password } = data;
      return firebase.auth().signInWithEmailAndPassword(email, password);
    },

    signUp: (data) => {
      const { email, password } = data;
      return firebase.auth().createUserWithEmailAndPassword(email, password);
    },

    signOut: () => {
      return firebase.auth().signOut();
    },

    getCurrentUser: () => {
      return firebase.auth().currentUser;
    },

    onAuthStateChanged: (callback) => {
      return firebase.auth().onAuthStateChanged(callback);
    },

    reauthenticate: (password) => {
      const user = firebase.auth().currentUser;
      return user.reauthenticateWithCredential(
        firebase.auth.EmailAuthProvider.credential(user.email, password)
      );
    },

    updatePassword: (newPassword) => {
      const user = firebase.auth().currentUser;
      return user.updatePassword(newPassword);
    },
  },
  emails: {
    sendPasswordResetEmail: (data) => {
      const { email } = data;
      return firebase.auth().sendPasswordResetEmail(email);
    },
  },
  users: {
    create: (data) => {
      const id = firebase.auth().currentUser.uid;
      const { name, email } = data;
      return firebase
        .firestore()
        .collection("users")
        .doc(id)
        .set({
          name,
          email,
          created: firebase.firestore.Timestamp.fromDate(new Date()),
          preferences: {
            theme: "system"
          }
        });
    },
    subscribe: (callback) => {
      const id = firebase.auth().currentUser.uid;
      return firebase
        .firestore()
        .collection("users")
        .doc(id)
        .onSnapshot(callback);
    },
    update: (data) => {
      const id = firebase.auth().currentUser.uid;
      return firebase.firestore().collection("users").doc(id).update(data);
    },
  },
};

export default API;
