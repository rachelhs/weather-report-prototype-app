import React from 'react';
const data = require('../../data/data.json');
const firebase = require('firebase/app');
import database from '../../firebase/firebase';

export default class AllGratitudes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listOfGrateful: ''
        };
        this.getListOfGratitudes = this.getListOfGratitudes.bind(this)
    }

    componentDidMount() {
        this.getListOfGratitudes
    }

    getListOfGratitudes = () => {

        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let listOfGrateful = [];

        database.ref(`users/${uid}/grateful`)
        .on('value', (snapshot) => {
            console.log(snapshot)
            // get list of keys for each entry
            snapshot.forEach((childSnapshot) => {
                let gratitude = childSnapshot.val();
                console.log(gratitude)
            })

        })
    }

    render() 
    
    {
        return (
            <div>
            <h1 className='info-box-title'>{data[10].home.fish}</h1>
            <h1 className='info-box-title'>{this.state.listOfGrateful}</h1>
            </div>
        )
    }
}