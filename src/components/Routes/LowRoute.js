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
            toggleHowLong: false,
            addNote: false,
            value: ''
        };

        this.onNext = this.onNext.bind(this);
        this.IsLongerThanThreeDays = this.IsLongerThanThreeDays.bind(this);
        this.onYes = this.onYes.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    IsLongerThanThreeDays = () => {
        // get timestamp for now
        const now = Date.now();
        // get timestamp for 3 days ago
        // 259200000 milliseconds in 3 days
        const threeDaysAgo = now - 259200000;
        // has user updated mood in the previous 3 days?
        // retrieve entry before the current one
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        // return two most recent entries
        database.ref(`users/${uid}/entries`)
            .orderByChild('createdAt')
            .limitToLast(2)
            .on('value', (snapshot) => {
                snapshot.forEach((child) => {
                    // if timestamp for either entry is older than 3 days
                    let time = child.val().createdAt;
                    console.log(time);
                    if (time < threeDaysAgo) {
                        this.setState({ toggleHowLong: true });
                    }
                })
            })
    }

    onNext = () => {
        console.log('next');
        this.setState({ viewNumber: this.state.viewNumber + 1 });
    };

    onHowLong = (howLong) => {
        console.log('button clicked');
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let name = '';
        //get id for the current entry
        database.ref(`users/${uid}/entries`).orderByChild('createdAt').limitToLast(1).on('child_added', (snapshot) => {
            name = snapshot.key;
            database.ref(`users/${uid}/entries/${name}`).update({
                howLong: howLong
            })
        })
    };

    onYes = () => {
        console.log('yes');
        this.setState({ addNote: true });
    }

    handleSubmit = (e) => {
        // stops page refreshing
        e.preventDefault();
        console.log('submit');
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let name = '';
        //get id for the current entry
        database.ref(`users/${uid}/entries`).orderByChild('createdAt').limitToLast(1).on('child_added', (snapshot) => {
            name = snapshot.key;
            database.ref(`users/${uid}/entries/${name}`).update({
                note: this.state.value
            })
        })
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }

    componentDidMount = () => {
        this.IsLongerThanThreeDays();
    }

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
                    {(this.state.viewNumber == 1) ? <h1 className='info-box-text'>{question1}</h1> :
                        (this.state.viewNumber == 2 && this.state.toggleHowLong == true) ?
                            <div><h1 className='info-box-text'>{question2}</h1>
                                <button onClick={() => this.onHowLong('today')}>today</button>
                                <button onClick={() => this.onHowLong('a few days')}>a few days</button>
                                <button onClick={() => this.onHowLong('a week')}>a week</button>
                                <button onClick={() => this.onHowLong('longer')}>longer</button></div> :
                            (this.state.viewNumber == 2 && this.state.toggleHowLong == false) ? <div><h1 className='info-box-text'>{question3}</h1><button onClick={() => this.onYes()}>yes</button><button>no</button></div> :
                                (this.state.viewNumber == 3 && this.state.toggleHowLong == true) ? <div><h1 className='info-box-text'>{question3}</h1><button onClick={() => this.onYes()}>yes</button><button>no</button></div> :
                                    ((this.state.viewNumber == 3 && this.state.toggleHowLong == false && this.state.addNote == true) ||
                                        (this.state.viewNumber == 4 && this.state.toggleHowLong == true && this.state.addNote == true)) ?
                                        <div>
                                            <form onSubmit={this.handleSubmit}>
                                                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                                                <button>Submit</button>
                                            </form>
                                            </div> :
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
