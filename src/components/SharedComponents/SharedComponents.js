// FILE CONTAINING COMPONENTS WHICH ARE SHARED ACROSS PATHS
const data = require('../../data/data.json');
const firebase = require('firebase/app');
require('firebase/auth');
import React, {useState} from 'react';
import moment from 'moment';
import BackgroundAnimation from '../../components/Animations/BackgroundAnimation'
import ForegroundAnimation from '../../components/Animations/ForegroundAnimation'
import { randomQuestionNumber  } from '../../actions/route-functions';
import database from '../../firebase/firebase';
import { CSSTransition } from 'react-transition-group';
import { storage } from "../../firebase/firebase";

//Is there anything you are aware of that has made you feel like this QUESTION
export class ReasonForFeelings extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[3].shared.reason}</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>Yes</button>
                    <button className='next-button' onClick={(e) => this.props.onClick(false)}>No</button>
                </div>
            </div>
        )
    }
}

// Is there anything you are aware of that has made you feel like this INPUT BOX
export class ReasonForFeelingsInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleNoteSubmit = this.handleNoteSubmit.bind(this);
    }

    handleNoteSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let name = '';
        database.ref(`users/${uid}/entries`).orderByChild('createdAt').limitToLast(1).on('child_added', (snapshot) => {
            name = snapshot.key;
            database.ref(`users/${uid}/entries/${name}`).update({
                note: this.state.value
            })
        })
    }

    handleNoteChange = (e) => {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[3].shared.reason}</h1>
                <form className='button-container-vertical' onSubmit={this.handleNoteSubmit}>
                    <textarea className='free-form-input input-paragraph' type="text" value={this.state.value} onChange={this.handleNoteChange} />
                    <button className='next-button free-form-submit' onClick={this.props.buttonClick}>Submit</button>
                </form>
            </div>
        )
    }
}

// I’m sorry you are feeling like this
export class Acknowledgement extends React.Component {
    render() {
        return (
            <h1 className='info-box-title'>{data[3]['shared']['acknowledge'][this.props.dataFromParent]}</h1>
        )
    }
}

// How long have you felt like this? Today, a few days, a week, longer
export class HowLongHaveYouFeltLikeThis extends React.Component {
    onHowLong = (howLong) => {
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
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[3].shared.howLong}</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={() => this.onHowLong('today')} onClick={this.props.buttonClick}>today</button>
                    <button className='next-button' onClick={() => this.onHowLong('a few days')} onClick={this.props.buttonClick}>a few days</button>
                    <button className='next-button' onClick={() => this.onHowLong('a week')} onClick={this.props.buttonClick}>a week</button>
                    <button className='next-button' onClick={() => this.onHowLong('longer')} onClick={this.props.buttonClick}>longer</button>
                </div>
            </div>
        )
    }
}


//Do you want to do another exercise
export class AnotherExerciseQuestion extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[3].shared.anotherExercise}</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>Yes</button>
                    <button className='next-button' onClick={(e) => this.props.onClick(false)}>No</button>
                </div>
            </div>
        )
    }
}

//Would you like to be reminded of this in the future
export class SetReminder extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[3].shared.reminderQuestion}</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>Yes</button>
                    <button className='next-button' onClick={(e) => this.props.onClick(false)}>No</button>
                </div>
            </div>
        )
    }
}


//Ask whether user wants to upload a photo
export class TakePhoto extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[3].shared.photoAsk}</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>Yes</button>
                    <button className='next-button' onClick={(e) => this.props.onClick(false)}>No</button>
                </div>
            </div>
        )
    }
}

//UpLOAD a PHOTO
export class ReactFirebaseFileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            image: null,
            url: "nothing",
            progress: 0,
            createdAt: props.entry ? moment(props.entry.createdAt) : moment()
        };
    }

  
    handleChange = (e) => {
      if (e.target.files[0]) {
        this.setState({ image: e.target.files[0] });
      }
    };
  
    handleUpload = () => {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ progress: progress });
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                .ref("images")
                .child(this.state.image.name)
                .getDownloadURL()
                .then(url => {
                    this.setState({ url: url });
                    console.log('url', this.state.url)
                    const data = {
                        url: this.state.url,
                        savedOn: this.state.createdAt.valueOf()
                    }
                    database.ref(`users/${uid}/images`).push(data)
                });
            }
        );
    };

    render() {
        const feedback = this.state.progress == 100 ? <h2>Thank you for uploading this memory</h2> : <h2></h2>;
        return (
        <div>
            {/* <progress value={this.state.progress} max="100" /> */}
            <input type="file" onChange={this.handleChange} />
            <button onClick={this.handleUpload}>Upload</button>
            { feedback }
            <div className='button-container'>
                <button className='next-button' onClick={(e) => this.props.onClick(true)}>Next</button>
            </div>
        </div>
        );
    }
  };


// Asks if the exercise helped and takes note of what it was
export class AskIfHelped extends React.Component {

    constructor(props) {
        super(props);
    }

    addToDatabase(res) {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let name = '';
        let exercise = this.props.exercise;
        //get id for current entry
        database.ref(`users/${uid}/entries`).orderByChild('createdAt').limitToLast(1).on('child_added', function (snapshot) {
            name = snapshot.key;
            database.ref(`users/${uid}/entries/${name}/exercises/${exercise}`).update({
                res
            })
        })
    }

    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[6].veryLow.questions.exHelped}</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => {this.props.onClick(true); this.addToDatabase('yes');}}>Yes</button>
                    <button className='next-button' onClick={(e) => {this.props.onClick(true); this.addToDatabase('no');}}>No</button>
                    <button className='next-button' onClick={(e) => {this.props.onClick(true); this.addToDatabase('a bit');}}>A Bit</button>
                </div>
            </div>
        )
    }
}

//Feedback Statement
export class FeedbackStatement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            randFeedbackStatement: null
        }
      }

    componentDidMount() { 
        const feedbackArray = data[3]['shared']['feedbackStatements'][this.props.dataFromParent]
        this.setState({ randFeedbackStatement: randomQuestionNumber(feedbackArray.length) });
    }
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[3]['shared']['feedbackStatements'][this.props.dataFromParent][this.state.randFeedbackStatement]}</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>home</button>
                </div>
            </div>
        )
    }
}

// called when user selects that they haven't contacted their supporters
export class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showText: true,
            showAnchors: false
        }

        this.showText = this.showText.bind(this);
    }

    componentDidMount() {
        // set timeout for prompts
        setTimeout(() => { this.setState({ showText: false }) }, 3000)
    }

    showText() {
        this.setState({ showAnchors: true })
    }

    render() {
        return (
            <div>
                <CSSTransition in={this.state.showText} timeout={2000} classNames="fade" unmountOnExit appear onExited={() => this.showText()}><h1 className='info-box-title'>{data[6].veryLow.questions.support}</h1></CSSTransition>
                <CSSTransition in={this.state.showAnchors} timeout={2000} classNames="fade" unmountOnExit><AllRoots /></CSSTransition>
            </div>
        )
    }
}

// show list of roots (anchors)
export class AllRoots extends React.Component {
    render() {
        return (
            <div className='info-box'>
                <h1>[NEEDS DOING - LIST OF ROOTS GOES HERE]</h1>
            </div>
        )
    }
}

// other components
export class AnimationsCombined extends React.Component {
    render() {
        return (
            <span>
                <div className='background-anim'>
                    <BackgroundAnimation />
                </div>
                <div className='foreground-anim'>
                    <ForegroundAnimation />
                </div>
            </span>
        )
    }
}

