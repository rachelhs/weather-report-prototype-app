import React from 'react';
import BackgroundAnimation from '../Animations/BackgroundAnimation'
import ForegroundAnimation from '../Animations/ForegroundAnimation'
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';

//get asked questions 1 and 2
//excercises - 3 x replays - grateful, positive memory, things you like about yourself

export class LowRoute extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewNumber: 1,
            toggleHowLong: false
        };

        this.onNext = this.onNext.bind(this);
        this.IsLongerThanThreeDays = this.IsLongerThanThreeDays.bind(this);
    }

    IsLongerThanThreeDays = () => {
        const now = Date.now();
        const threeDaysAgo = now - 259200;
            //has user updated mood in the previous 3 days?
            //retrieve entry before the current one
            const user = firebase.auth().currentUser;
            const uid = user.uid;
            // return two most recent entries
            database.ref(`users/${uid}/entries`)
            .orderByChild('createdAt')
            .limitToLast(2)
            .on('value', function(snapshot) {
                snapshot.forEach(function(child) {
                    // if timestamp for either entry is older than 3 days
                    let time = child.val().createdAt;
                    if(time < threeDaysAgo) {
                        console.log('hello');
                        this.setState({ toggleHowLong: true });
                    }
                })
            })

    }

    onNext = () => {
        console.log('next');
        this.setState({ viewNumber: this.state.viewNumber + 1 });
        this.IsLongerThanThreeDays();
    };

    render() {
        let script = require('../../../src/data/script.json');
        let question1 = (script[0].low[1]);
        let question2 = (script[0].low[2]);
        let question3 = (script[0].low[3]);
        let question4 = (script[0].low[4]);

        return (
            <div>
            <div className='background-anim'>
            <BackgroundAnimation />
            </div>
            <div className='foreground-anim'>
            <ForegroundAnimation />
            </div>
            <div className='info-box'>
            {(this.state.viewNumber == 1) ? <h1 className='info-box-text'>{ question1 }</h1> :
            (this.state.viewNumber == 2 && this.state.toggleHowLong == true) ? <h2>2</h2> : 
            (this.state.viewNumber == 2 && this.state.toggleHowLong == false) ? <h2>3</h2> :
            ''}
            <div className='info-box-button'>
            <button onClick={this.onNext}>next</button>
            </div>
            </div>
            </div>
        );
    }
}

export default LowRoute;
