// FILE CONTAINING COMPONENTS WHICH ARE SHARED ACROSS PATHS
import React from 'react';
import BackgroundAnimation from '../../components/Animations/BackgroundAnimation'
import ForegroundAnimation from '../../components/Animations/ForegroundAnimation'
const data = require('../../data/data.json');
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';
import { CSSTransition } from 'react-transition-group';
import ReactModal from 'react-modal';
import { SetExercises } from '../Exercises/SetExercises';

// I’m sorry you are feeling like this
export class LowAcknowledgement extends React.Component {
    render() {
        return (
            <h1 className='info-box-title'>{data[3].shared.acknowledge}</h1>
        )
    }
}

// I’m sorry you are feeling like this
export class VeryLowAcknowledgement extends React.Component {
    render() {
        return (
            <h1 className='info-box-title'>{data[3].shared.lowerAcknowledge}</h1>
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

// Are you keeping yourself safe?
export class SafeQuestion extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[3].shared.safeQuestion}</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>Yes</button>
                    <button className='next-button' onClick={(e) => this.props.onClick(false)}>No</button>
                </div>
            </div>
        )
    }
}

//Feedback Statement
export class FeedbackStatement extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[3].shared.feedbackStatement}</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>home</button>
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
                <h1 className='info-box-title'>Write a note to yourself about what had led you to feel this way</h1>
                <form className='button-container' onSubmit={this.handleNoteSubmit}>
                    <input className='free-form-input' type="text" value={this.state.value} onChange={this.handleNoteChange} />
                    <button className='next-button free-form-submit' onClick={this.props.buttonClick}>Submit</button>
                </form>
            </div>
        )
    }
}

// What’s one small thing you can do to make yourself feel better?
export class PositiveThingQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = { valuePos: '' };
        this.handlePosSubmit = this.handlePosSubmit.bind(this);
    }

    handlePosSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        database.ref(`users/${uid}/positiveThings`).push(this.state.valuePos);
    }

    handlePosChange = (e) => {
        this.setState({ valuePos: e.target.value });
    }

    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[4].mediumLow.questions.posThing}</h1>
                <form className='button-container' onSubmit={this.handlePosSubmit}>
                    <input className='free-form-input' type="text" value={this.state.value} onChange={this.handlePosChange} />
                    <button className='next-button free-form-submit' onClick={this.props.buttonClick}>Submit</button>
                </form>
            </div>
        )
    }
}

// What’s one thing a friend would say they like about you?
export class FriendsLikeQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = { friendsLike: '' };
        this.handleFriendsSubmit = this.handleFriendsSubmit.bind(this);
    }

    handleFriendsSubmit = (e) => {
        // stops page refreshing
        e.preventDefault();
        console.log('submit');
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        database.ref(`users/${uid}/friendsLike`).push(this.state.friendsLike);
    }

    handleFriendsChange = (e) => {
        this.setState({ valuePos: e.target.value });
    }

    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[4].mediumLow.questions.friendLike}</h1>
                <form className='button-container' onSubmit={this.handleFriendsSubmit}>
                    <input className='free-form-input' type="text" value={this.state.value} onChange={this.handleFriendsChange} />
                    <button className='next-button free-form-submit' onClick={this.props.buttonClick}>Submit</button>
                </form>
            </div>
        )
    }
}

// What things helped you cope in the past?
export class HelpedCopeQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = { helpedCope: '' };
        this.handleCopedSubmit = this.handleCopedSubmit.bind(this);
    }

    handleCopedSubmit = (e) => {
        // stops page refreshing
        e.preventDefault();
        console.log('submit');
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        database.ref(`users/${uid}/helpedCope`).push(this.state.helpedCope);
    }

    handleCopedChange = (e) => {
        this.setState({ valuePos: e.target.value });
    }

    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[5].low.questions.helpedCope}</h1>
                <form className='button-container' onSubmit={this.handleCopedSubmit}>
                    <input className='free-form-input' type="text" value={this.state.value} onChange={this.handleCopedChange} />
                    <button className='next-button free-form-submit' onClick={this.props.buttonClick}>Submit</button>
                </form>
            </div>
        )
    }
}

// First Aid Kit
export class FirstAidKit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showQuestions: true,
            showModalGrounding: false,
            showModal999: false,
            content: '',
            contentText: ''
        }

        this.handleOpenModalGrounding = this.handleOpenModalGrounding.bind(this);
        this.handleCloseModalGrounding = this.handleCloseModalGrounding.bind(this);
        this.handleOpenModal999 = this.handleOpenModal999.bind(this);
        this.handleCloseModal999 = this.handleCloseModal999.bind(this);
    }

    handleOpenModalGrounding() {
        this.setState({ showModalGrounding: true });
    }

    handleCloseModalGrounding() {
        this.setState({ showModalGrounding: false });
    }

    handleOpenModal999() {
        this.setState({ showModal999: true });
    }

    handleCloseModal999() {
        this.setState({ showModal999: false });
    }

    componentDidMount() {
        // set timeout for prompts
        setTimeout(() => { this.setState({ showQuestions: false }) }, 3000)
    }

    showOptions() {
        this.setState({
            showQuestions: false,
            showOptions: true
        })
    }

    render() {
        return (
            <div>
                <CSSTransition in={this.state.showQuestions} timeout={2000} classNames="fade" unmountOnExit appear onExited={() => this.showOptions()}>
                    <div><h1 className='info-box-title'>{data[7].firstAid.questions.help}</h1><h1 className='info-box-title'>{data[7].firstAid.questions.need}</h1></div></CSSTransition>
                <CSSTransition in={this.state.showOptions} timeout={2000} classNames="fade" unmountOnExit>
                    <div className='button-container-vertical'>
                        <button onClick={this.handleOpenModalGrounding} className='next-button'>Grounding Exercise</button>
                        <button className='next-button'>Reach out to Supporters / Roots</button>
                        <button className='next-button'>Reach out to GP / Support Worker</button>
                        <button className='next-button'>Call Bristol Mental Health Crisis Team: 0300 555 0334</button>
                        <button onClick={this.handleOpenModal999} className='next-button'>Ring 999 or go to A & E</button>

                        <ReactModal 
                        isOpen={this.state.showModalGrounding}
                        contentLabel="Minimal Modal Example"
                        ariaHideApp={false}
                     >
                       <button onClick={this.handleCloseModalGrounding}>X</button>
                       {SetExercises('grounding')}
                     </ReactModal>

                     <ReactModal 
                     isOpen={this.state.showModal999}
                     contentLabel="Minimal Modal Example"
                     ariaHideApp={false}
                  >
                    <button onClick={this.handleCloseModal999}>X</button>
                    <h1 className='info-box-title'>{data[7].firstAid.options.ae}</h1>
                  </ReactModal>

                    </div>
                </CSSTransition>
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

