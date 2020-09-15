// FILE CONTAINING COMPONENTS WHICH ARE SHARED ACROSS PATHS
const data = require('../../data/data.json');
const firebase = require('firebase/app');
require('firebase/auth');
import React, {useState} from 'react';
import moment from 'moment';
import BackgroundAnimation from '../../components/Animations/BackgroundAnimation'
import ForegroundAnimation from '../../components/Animations/ForegroundAnimation'
import Animation from '../../components/Animations/Animation'
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

// I’m sorry you are feeling like this ...
export class SuicidalAcknowledgement extends React.Component {
    render() {
        return (
            <h1 className='info-box-title'>{data[3].shared.acknowledge.suicidal}</h1>
        )
    }
}

// How long have you felt like this? Today, a few days, a week, longer
export class HowLongHaveYouFeltLikeThis extends React.Component {
    onHowLong = (howLong) => {
        console.log('function called');
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
                    <button className='next-button' onClick={(e) => { this.onHowLong('today'); this.props.buttonClick(true) }}>today</button>
                    <button className='next-button' onClick={(e) => { this.onHowLong('a few'); this.props.buttonClick(true) }}>a few days</button>
                    <button className='next-button' onClick={(e) => { this.onHowLong('a week'); this.props.buttonClick(true) }}>a week</button>
                    <button className='next-button' onClick={(e) => { this.onHowLong('longer'); this.props.buttonClick(true) }}>longer</button>
                </div>
            </div>
        )
    }
}


// Have you spoken to anyone about how you feel QUESTION
export class SpokenToQ extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.spoken}</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>Yes</button>
                    <button className='next-button' onClick={(e) => this.props.onClick(false)}>No</button>
                </div>
            </div>
        )
    }
}

// Are you at risk of harming yourself QUESTION
export class RiskOfHarm extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.risk}</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>Yes</button>
                    <button className='next-button' onClick={(e) => this.props.onClick(false)}>No</button>
                </div>
            </div>
        )
    }
}

// Do you have a plan QUESTION
export class PlanQ extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.plan}</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>Yes</button>
                    <button className='next-button' onClick={(e) => this.props.onClick(false)}>No</button>
                </div>
            </div>
        )
    }
}

// Are you planning on acting QUESTION
export class PlanningQ extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.act}</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>Yes</button>
                    <button className='next-button' onClick={(e) => this.props.onClick(false)}>No</button>
                </div>
            </div>
        )
    }
}

// Feelings pass Statement
export class FeelingsPassStatement extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.pass}</h1>
            </div>
        )
    }
}

// 999 / samaritans statement with next button
export class Samaritans extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.samaritans}</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>OK</button>
                </div>
            </div>
        )
    }
}

// Crisis team statement with next button
export class Crisis extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.crisis}</h1>
                <h1 className='info-box-title'>{data[8].suicidal.questions.crisis2}</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>OK</button>
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
                    <button className='next-button' onClick={(e) => { this.props.onClick(true); this.addToDatabase('yes'); }}>Yes</button>
                    <button className='next-button' onClick={(e) => { this.props.onClick(true); this.addToDatabase('no'); }}>No</button>
                    <button className='next-button' onClick={(e) => { this.props.onClick(true); this.addToDatabase('a bit'); }}>A Bit</button>
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
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.reach}</h1>
                <h1 className='info-box-title'>[NEEDS DOING - LIST OF ROOTS GOES HERE]</h1>
            </div>
        )
    }
}

// show list of roots (anchors) and with a next button
export class AllRootsWithNext extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.reach}</h1>
                <h1 className='info-box-title'>[NEEDS DOING - LIST OF ROOTS GOES HERE]</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>next</button>
                </div>
            </div>
        )
    }
}

// Generalised piece of text with next buttonß
export class TextWithNext extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{this.props.text}</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>Next</button>
                </div>
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

export class AnimationsLayered extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>
                {this.props.animations[0] ? <div className='anim-0'><Animation animation={this.props.animations[0]} /></div> : ''}
                {this.props.animations[1] ? <div className='anim-1'><Animation animation={this.props.animations[1]} /></div> : ''}
                {this.props.animations[2] ? <div className='anim-2'><Animation animation={this.props.animations[2]} /></div> : ''}
                {this.props.animations[3] ? <div className='anim-3'><Animation animation={this.props.animations[3]} /></div> : ''}
                {this.props.animations[4] ? <div className='anim-4'><Animation animation={this.props.animations[4]} /></div> : ''}
                {this.props.animations[5] ? <div className='anim-5'><Animation animation={this.props.animations[5]} /></div> : ''}
            </span>
        )
    }
}
