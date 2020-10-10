import React from 'react';
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';
const data = require('../../data/data.json');

export default class ReplayAnchors extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            randomPositive: ''
        };

        this.getRandomPositive = this.getRandomPositive.bind(this);
    }

    getRandomPositive = () => {

        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let listOfKeys = [];
        let rand = 0;
        let entry = '';

        database.ref(`users/${uid}/positiveThings`)
        .on('value', (snapshot) => {
            // get list of keys for each entry
            snapshot.forEach((childSnapshot) => {
                listOfKeys.push(childSnapshot.key);
            })
            // pick a random entry
            rand = Math.floor(Math.random() * listOfKeys.length);
            const randKey = listOfKeys[rand];
            database.ref(`users/${uid}/positiveThings/${randKey}`)
            .on('value', (childSnapshot) => {
                console.log(childSnapshot.val());
                entry = childSnapshot.val();
                this.setState({ randomPositive: entry });

            })
        })
    }

    componentDidMount = () => {
        this.getRandomPositive();
    }

    render() 
    
    {
        return (
            <div className='info-box'>
                <h1 className='info-box-title'>{data[3].shared.posReplayStatement}</h1>
                <h1 className='info-box-title'>{this.state.randomPositive}</h1>
            </div> 
        )
    }
}