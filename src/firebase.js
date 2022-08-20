import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIAMiLHnCYmCXaE4Px9C8KeP6NQZVuU3U",
  authDomain: "slack-clone-4d680.firebaseapp.com",
  projectId: "slack-clone-4d680",
  storageBucket: "slack-clone-4d680.appspot.com",
  messagingSenderId: "865860727852",
  appId: "1:865860727852:web:c6493bb8d12ab19f278d89",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
//enabling entication
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
