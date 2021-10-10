import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA-_RpDMKncHrjdojZ4FkPXdnngqE8g8Jo",
    authDomain: "clone-75ddc.firebaseapp.com",
    projectId: "clone-75ddc",
    storageBucket: "clone-75ddc.appspot.com",
    messagingSenderId: "812901904659",
    appId: "1:812901904659:web:0827dfed81bda23a2b6ae6"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth()
const db = firebaseApp.firestore()


export {db, auth}