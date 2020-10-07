// FILE CONTAINING FUNCTIONS WHICH ARE SHARED ACROSS PATHS
import React from 'react';
const firebase = require('firebase/app');
import database from '../firebase/firebase';
import { useHistory } from 'react-router-dom'

//is longer than 3 days function
export function isLongerThanThreeDays(cb) {
    const now = Date.now(); // get timestamp for now
    const threeDaysAgo = now - 259200000; // get timestamp for 3 days ago (259200000 milliseconds)
    const uid = firebase.auth().currentUser.uid;
    let counter = 0;
    database.ref(`users/${uid}/weatherReports`)
        .orderByChild('createdAt') //order by createAt value
        .limitToLast(2) // return two most recent entries
        .once('value', (snapshot) => {
            snapshot.forEach((child) => {
                let key = Object.keys(child.val())[0];
                if (key < threeDaysAgo) {
                    counter +=1;
                }
            })
            if(counter >= 1) {
                cb(true)
                return
            }
            else {
                cb(false)
                return
            }
        })
}

//set random question

export function randomQuestionNumber(num) {
    const rand = Math.floor(Math.random() * Math.floor(num));
    return rand
}

export function chooseAnotherRandomExercise(exerciseArray, lastExercise) {
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
    database.ref(`users/${uid}/weatherReports`)
        .orderByChild('createdAt') //order by createAt value
        .limitToLast(7)
        .once('value', (snapshot) => {
            snapshot.forEach((child) => {
                // first entry for each day
                let childKey = Object.keys(child.val())[0];
                let mainWord = child.val()[childKey].mainWord;
                let createdAt = child.val()[childKey].createdAt;
                
                let mainWord2 = ''
                let createdAt2 = ''
                let mainWord3 = ''
                let createdAt3 = ''

                // second entry if exists
                if (Object.keys(child.val())[1]) {
                    let childKey2 = Object.keys(child.val())[1];
                    mainWord2 = child.val()[childKey2].mainWord;
                    createdAt2 = child.val()[childKey2].createdAt;
                }
                // third entry if exists
                if (Object.keys(child.val())[2]) {
                    let childKey3 = Object.keys(child.val())[2];
                    mainWord3 = child.val()[childKey3].mainWord;
                    createdAt3 = child.val()[childKey3].createdAt;
                }

                // count goes up if one of the key words entered as a main word in the last 7 days
                if ((createdAt >= sevenDaysAgo) && (mainWord === 'suicidal')) {
                    counter += 1;
                }
                if ((createdAt2 >= sevenDaysAgo) && (mainWord2 === 'suicidal')) {
                    counter += 1;
                }
                if ((createdAt3 >= sevenDaysAgo) && (mainWord3 === 'suicidal')) {
                    counter += 1;
                }
                console.log(counter);
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
    database.ref(`users/${uid}/weatherReports`)
        .orderByChild('createdAt') //order by createAt value
        .limitToLast(7)
        .once('value', (snapshot) => {
            snapshot.forEach((child) => {
                // first entry for each day
                let childKey = Object.keys(child.val())[0];
                let mainWord = child.val()[childKey].mainWord;
                let createdAt = child.val()[childKey].createdAt;
                
                let mainWord2 = ''
                let createdAt2 = ''
                let mainWord3 = ''
                let createdAt3 = ''

                // second entry if exists
                if (Object.keys(child.val())[1]) {
                    let childKey2 = Object.keys(child.val())[1];
                    mainWord2 = child.val()[childKey2].mainWord;
                    createdAt2 = child.val()[childKey2].createdAt;
                }
                // third entry if exists
                if (Object.keys(child.val())[2]) {
                    let childKey3 = Object.keys(child.val())[2];
                    mainWord3 = child.val()[childKey3].mainWord;
                    createdAt3 = child.val()[childKey3].createdAt;
                }

                // count goes up if one of the key words entered as a main word in the last 7 days
                if ((createdAt >= sevenDaysAgo) && (mainWord === 'manic' || 'invincible' || 'over stimulated')) {
                    counter += 1;
                }
                if ((createdAt2 >= sevenDaysAgo) && (mainWord2 === 'manic' || 'invincible' || 'over stimulated')) {
                    counter += 1;
                }
                if ((createdAt3 >= sevenDaysAgo) && (mainWord3 === 'manic' || 'invincible' || 'over stimulated')) {
                    counter += 1;
                }
                console.log(counter);
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

// back button
export function BackButton({ children }) {
    let history = useHistory()
    return (
      <button className='back-button' type="button" onClick={() => history.goBack()}>
        BACK
      </button>
    )
}

// back button
export function BackButtonFirstAid({ children }) {
    let history = useHistory()
    return (
      <button className='first-aid-close' type="button" onClick={() => history.goBack()}>
        CLOSE
      </button>
    )
}


export function GetKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key].includes(value));
}
