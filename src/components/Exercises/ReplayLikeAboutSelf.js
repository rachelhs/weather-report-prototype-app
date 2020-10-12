import React from 'react';
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';
import Gratitude from './ReplayGratitude';
const data = require('../../data/data.json');

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

        database.ref(`users/${uid}/likeAboutSelf`)
        .on('value', (snapshot) => {
            // get list of keys for each entry
            snapshot.forEach((childSnapshot) => {
                listOfKeys.push(childSnapshot.key);
            })
            // pick a random entry
            rand = Math.floor(Math.random() * listOfKeys.length);
            const randKey = listOfKeys[rand];
            database.ref(`users/${uid}/likeAboutSelf/${randKey}`)
            .on('value', (childSnapshot) => {
                entry = childSnapshot.val();
                this.setState({ randomLike: entry });
            })
        })
    }

    componentDidMount = () => {
        this.getRandomLike();
    }

    render() {
        const showStatement = this.state.randomLike ?
            <div className="positive-padding">
                <h2 className='info-box-title-no-padding'>{data[3].shared.likeReplayStatement}</h2>
                <div className="gratitudeBox">
                    <h2>{this.state.randomLike}</h2>
                </div>
                <div className='button-container'>
                    <button className='next-button-dark free-form-submit extra-margin-top' onClick={this.props.buttonClick}>NEXT</button>
                </div>
            </div>
            : 
            <div className="positive-padding">
                <h2 className='info-box-title-no-padding'>{data[3].shared.likeReplayStatement}</h2>
                <div className='button-container'>
                    <button className='next-button-dark free-form-submit extra-margin-top' onClick={this.props.buttonClick}>NEXT</button>
                </div>
            </div>
        return (
            <div>
                { showStatement }
            </div>
        )
    }
}