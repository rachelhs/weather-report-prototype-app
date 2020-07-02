const firebase = require('firebase/app');
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

//const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// const emailProvider = firebase.auth.EmailAuthProvider.credential(
//     email,
//     password
// );
export { firebase, googleAuthProvider, database as default };

// database.ref('expenses')
// .on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });
//     console.log(expenses);
// });

//child removed
// database.ref().on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

//child changed
// database.ref().on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

//child added
// database.ref().on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses')
// .once('value')
// .then((snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot)=>{
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });
//     console.log(expenses);
// });

// database.ref('expenses').push({
//     description: 'rent',
//     note: 'expensive',
//     amount: 5000,
//     createdAt: 301
// });

// database.ref('notes').push({
//     title: 'course topics',
//     body: 'react native, angular'
// });

// const firebaseNotes = {
//     notes: {
//         sadfkuayd: {
//             title: 'first note',
//             body: 'this is my note'
//         },
//         asdfasdf: {
//             title: 'second note',
//             body:'note'
//         }
//     }
// };

// const onDataChange = database.ref().on('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// }, (e) => {
//     console.log('error fetching data', e);
// });


// fetch data on change (subscription) - replace on with off to cancel

// const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());
// }, (e) => {
//     console.log('error fetching data', e);
// });

// setTimeout(()=>{
//     database.ref('age').set(28);
// },3500);

// fetch data once

// database.ref('location')
// .once('value')
// .then((snapshot)=>{
//     const val = snapshot.val();
//     console.log(val);
// })
// .catch((e)=>{
//     console.log('error fetching data', e);
// });

// database.ref().set({
//     name: 'Andrew Meadu',
//     age: 30,
//     stressLevel: 6,
//     job: {
//         title: 'software developer',
//         company: 'google'
//     },
//     isBoy: true,
//     location: {
//         city: 'Philadelphia',
//         country: 'United States'
//     }
// }).then(()=>{
//     console.log('data is saved');
// }).catch((error)=>{
//     console.log('this failed', error);
// });

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'amazon',
//     'location/city': 'Seattle'
// });

// database.ref('isBoy').remove().then(()=>{
//     console.log('data removed');
// }).catch((e)=>{
//     console.log('error:', e);
// });

// database.ref('isBoy').set(null);