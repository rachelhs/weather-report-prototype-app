import React from 'react';
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';
const data = require('../../data/data.json');

// looks through last 30 entries for green and orange emotions that have non empty notes attached -> returns the note

export default class ReplayContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            randomContent: ''
        };

        this.getRandomContent = this.getRandomContent.bind(this);
    }

    getRandomContent = () => {

        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let listOfKeys = [];
        let rand = 0;
        let note = '';

        database.ref(`users/${uid}/entries`)
        .limitToLast(30)
        .on('value', (snapshot) => {
            // get list of keys for each entry
            snapshot.forEach((childSnapshot) => {
                // WHEN ROUTES ARE SET UP CHANGE THIS TO childSnapshot.val().route === 'ok' || childSnapshot.val().route === 'high'
                if(childSnapshot.val().mainWord === 'happy') {
                listOfKeys.push(childSnapshot.key);
                }
            })
            // pick a random entry
            rand = Math.floor(Math.random() * listOfKeys.length);
            const randKey = listOfKeys[rand];
            database.ref(`users/${uid}/entries/${randKey}`)
            .on('value', (childSnapshot) => {
                console.log(childSnapshot.val());
                note = childSnapshot.val().note;
                this.setState({ randomContent: note });

            })
        })
    }

    componentDidMount = () => {
        this.getRandomContent();
    }

    render() 
    
    {
        return (
            <div>
            <h1 className='info-box-title'>{data[3].shared.contentReplayStatement}</h1>
            <h1 className='info-box-title'>{this.state.randomContent}</h1>
            </div>
        )
    }
}