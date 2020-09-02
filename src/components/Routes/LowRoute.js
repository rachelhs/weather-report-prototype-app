import React from 'react';
import BackgroundAnimation from '../Animations/BackgroundAnimation'
import ForegroundAnimation from '../Animations/ForegroundAnimation'
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';
import { ChooseExercise } from '../Exercises/ChooseExercise';
import { SetExercises } from '../Exercises/SetExercises';

//get asked questions 1 and 2
//excercises - 3 x replays - grateful, positive memory, things you like about yourself

export class LowRoute extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewNumber: 1,
            toggleHowLong: false,
            addNote: false,
            value: '',
            valuePos: '',
            valueCope: '',
            randQues: 0,
            exercise: ''
        };

        this.onNext = this.onNext.bind(this);
        this.IsLongerThanThreeDays = this.IsLongerThanThreeDays.bind(this);
        this.onYes = this.onYes.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleNoteSubmit = this.handleNoteSubmit.bind(this);
        this.selectQuestion = this.selectQuestion.bind(this);
        this.handlePosSubmit = this.handlePosSubmit.bind(this);
        this.handleCopeSubmit = this.handleCopeSubmit.bind(this);
        this.handlePosChange = this.handlePosChange.bind(this);
        this.handleCopeChange = this.handleCopeChange.bind(this);
    }

    selectQuestion = () => {
        // replace 2 with number of questions
        const rand = Math.floor(Math.random() * Math.floor(2));
        this.setState({ randQues: rand });
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
        this.setState({ viewNumber: this.state.viewNumber + 1 });
        console.log(this.state.viewNumber);
        console.log(this.state.toggleHowLong);
        console.log(this.state.addNote);
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

    handleNoteSubmit = (e) => {
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

    handlePosSubmit = (e) => {
        // stops page refreshing
        e.preventDefault();
        console.log('submit');
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        database.ref(`users/${uid}/positiveThings`).push(this.state.valuePos);
    }

    handleCopeSubmit = (e) => {
        // stops page refreshing
        e.preventDefault();
        console.log('submit');
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        database.ref(`users/${uid}/helpedCope`).push(this.state.valueCope);
    }

    handleCopeChange = (e) => {
        this.setState({ valueCope: e.target.value });
    }

    handlePosChange = (e) => {
        this.setState({ valuePos: e.target.value });
    }

    handleNoteChange = (e) => {
        this.setState({ value: e.target.value });
    }

    componentDidMount = () => {
        this.IsLongerThanThreeDays();
        this.selectQuestion();
        const exercise = ChooseExercise(['gratitude']);
        this.setState({ exercise: exercise });
    }

    render() {
        let script = require('../../../src/data/script.json');
        let text1 = (script[0].low[1]);
        let text2 = (script[0].low[2]);
        let text3 = (script[0].low[3]);
        let question1 = (script[0].questions[1]);
        let question2 = (script[0].questions[2]);

        return (
            <div className='background-box'>
                <div className='background-anim'>
                    <BackgroundAnimation />
                </div>
                <div className='foreground-anim'>
                    <ForegroundAnimation />
                </div>
                <div className='info-box'>
                    {(this.state.viewNumber == 1) ? <h1 className='info-box-text'>{text1}</h1> :
                        (this.state.viewNumber == 2 && this.state.toggleHowLong == true) ?
                            <div><h1 className='info-box-text'>{text2}</h1>
                                <button className='next-button' onClick={() => this.onHowLong('today')}>today</button>
                                <button className='next-button' onClick={() => this.onHowLong('a few days')}>a few days</button>
                                <button className='next-button' onClick={() => this.onHowLong('a week')}>a week</button>
                                <button className='next-button' onClick={() => this.onHowLong('longer')}>longer</button></div> :
                            (this.state.viewNumber == 2 && this.state.toggleHowLong == false) ? <div><h1 className='info-box-text'>{text3}</h1><button onClick={() => this.onYes()}>yes</button><button>no</button></div> :
                                (this.state.viewNumber == 3 && this.state.toggleHowLong == true) ? <div><h1 className='info-box-text'>{text3}</h1><button onClick={() => this.onYes()}>yes</button><button>no</button></div> :
                                    ((this.state.viewNumber == 3 && this.state.toggleHowLong == false && this.state.addNote == true) ||
                                        (this.state.viewNumber == 4 && this.state.toggleHowLong == true && this.state.addNote == true)) ?
                                        <div>
                                            <form onSubmit={this.handleNoteSubmit}>
                                                <input type="text" value={this.state.value} onChange={this.handleNoteChange} />
                                                <button className='next-button'>Submit</button>
                                            </form>
                                        </div> :
                                        ((this.state.viewNumber == 5) ||
                                            (this.state.viewNumber == 3 && this.state.toggleHowLong == false && this.state.addNote == false) ||
                                            (this.state.viewNumber == 4 && (this.state.toggleHowLong == false ^ this.state.addNote == false))
                                        ) ? (this.state.randQues == 0) ? <div><h1>{question1}</h1>
                                            <form onSubmit={this.handlePosSubmit}>
                                                <input type="text" value={this.state.valuePos} onChange={this.handlePosChange} />
                                                <button className='next-button'>Submit</button>
                                            </form>
                                        </div> :
                                                <div><h1>{question2}</h1>
                                                    <form onSubmit={this.handleCopeSubmit}>
                                                        <input type="text" value={this.state.valueCope} onChange={this.handleCopeChange} />
                                                        <button>Submit</button>
                                                    </form>
                                                </div> : 
                                                ((this.state.viewNumber == 6) ||
                                                (this.state.viewNumber == 5 && (this.state.toggleHowLong == false || this.state.addNote == false)) || 
                                                (this.state.viewNumber == 4 && this.state.toggleHowLong == false && this.state.addNote == false)) ?
                                                <div>{SetExercises(this.state.exercise)}</div> :
                                            ''}
                    <div className='info-box-button'>
                        <button className='next-button' onClick={this.onNext}>next</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LowRoute;