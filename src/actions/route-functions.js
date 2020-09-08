// FILE CONTAINING FUNCTIONS WHICH ARE SHARED ACROSS PATHS
const firebase = require('firebase/app');
import database from '../firebase/firebase';

//is longer than 3 days function
export function isLongerThanThreeDays(cb) {
    const now = Date.now(); // get timestamp for now
    const threeDaysAgo = now - 259200000; // get timestamp for 3 days ago (259200000 milliseconds)
    const uid = firebase.auth().currentUser.uid;
    database.ref(`users/${uid}/entries`)
    .orderByChild('createdAt') //order by createAt value
    .limitToLast(2) // return two most recent entries
    .once('value', (snapshot) => {
        snapshot.forEach((child) => {
            let time = child.val().createdAt;
            if (time < threeDaysAgo) {
                cb(true)
                return
            }
            else {
                cb(false)
                return
            }
        })
    })
}

//set random question

export function randomQuestionNumber(num) {
    const rand = Math.floor(Math.random() * Math.floor(num));
    return rand
}


// print out a random positive statement
// export function RandomPositiveStatementsLow(num) {

//     render() {
//         const positiveArray = data[4].mediumLow.positiveStatements;
//         let random = Math.floor(Math.random()*positiveArray.length);
//         return (
//             <h1 className='info-box-title'>{positiveArray[random]}</h1>
//         )
//     }
// }