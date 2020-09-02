import React from 'react';
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';


export default class LikeAboutSelf extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            randomLike: ''
        };

        this.getRandomLike = this.getRandomLike.bind(this);
    }

    getRandomLike = () => {

        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let listOfKeys = [];
        let rand = 0;
        let entry = '';

        database.ref(`users/${uid}/helpedCope`)
        .on('value', (snapshot) => {
            // get list of keys for each entry
            snapshot.forEach((childSnapshot) => {
                listOfKeys.push(childSnapshot.key);
            })
            // pick a random entry
            rand = Math.floor(Math.random() * listOfKeys.length);
            const randKey = listOfKeys[rand];
            database.ref(`users/${uid}/helpedCope/${randKey}`)
            .on('value', (childSnapshot) => {
                console.log(childSnapshot.val());
                entry = childSnapshot.val();
                this.setState({ randomLike: entry });

            })
        })
    }

    componentDidMount = () => {
        this.getRandomLike();
    }

    render() 
    
    {
        return (
            <h1>{this.state.randomLike}</h1>
        )
    }
}