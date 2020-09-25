const firebase = require('firebase/app');
import "firebase/storage";

require('firebase/auth');
require('firebase/database');

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FFIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const createUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password)
const logInUser = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password)

const storage = firebase.storage();

export { firebase, googleAuthProvider, storage, createUser, logInUser, database as default };
