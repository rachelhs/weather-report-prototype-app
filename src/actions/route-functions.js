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

export function chooseAnotherRandomExercise(exerciseArray, lastExercise) {
    console.log('choose another ...');
    for (let i = 0; i < exerciseArray.length; i++) {
        if (exerciseArray[i] === lastExercise) {
            exerciseArray.splice(i, 1);
        }
    }
    return exerciseArray;
}

// functions which checks if a user has inputed suicidal as mainWord x times in the last week
export function expressedSuicidalRecently(cb) {
    const uid = firebase.auth().currentUser.uid;
    let counter = 0;
    const now = Date.now(); // get timestamp for now
    const sevenDaysAgo = now - 604800000; // get timestamp for 7 days ago (604800000 milliseconds)
    database.ref(`users/${uid}/entries`)
        .limitToLast(21) // last 21 entries is max possible in a week
        .once('value', (snapshot) => {
            snapshot.forEach((child) => {
                let mainWord = child.val().mainWord;
                let createdAt = child.val().createdAt;
                if ((createdAt >= sevenDaysAgo) && mainWord === 'suicidal') {
                    counter += 1;
                }
            })
            if(counter >= 3) {
                cb(true)
                return
            }
            else {
                cb(false)
                return
            }
        })
}

// functions which checks if a user has inputed a red word as mainWord x times in the last week
export function expressedTooHighRecently(cb) {
    const uid = firebase.auth().currentUser.uid;
    let counter = 0;
    const now = Date.now(); // get timestamp for now
    const sevenDaysAgo = now - 604800000; // get timestamp for 7 days ago (604800000 milliseconds)
    database.ref(`users/${uid}/entries`)
        .limitToLast(21) // last 21 entries is max possible in a week
        .once('value', (snapshot) => {
            snapshot.forEach((child) => {
                let mainWord = child.val().mainWord;
                let createdAt = child.val().createdAt;
                // ignore if not in the last 7 days
                if ((createdAt >= sevenDaysAgo) && mainWord === 'manic' || 'over stimulated' || 'invincible') {
                    counter += 1;
                }
            })
            if(counter >= 3) {
                cb(true)
                return
            }
            else {
                cb(false)
                return
            }
        })
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