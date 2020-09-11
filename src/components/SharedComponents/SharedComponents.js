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

// I’m sorry you are feeling like this ...
export class VeryLowAcknowledgement extends React.Component {
    render() {
        return (
            <h1 className='info-box-title'>{data[3].shared.lowerAcknowledge}</h1>
        )
    }
}

// I’m sorry you are feeling like this ...
export class SuicidalAcknowledgement extends React.Component {
    render() {
        return (
            <h1 className='info-box-title'>{data[3].shared.suicidalAcknowledge}</h1>
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

// Have you contacted your supporters?
export class ContactSupportersQuestion extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[3].shared.support}</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>Yes</button>
                    <button className='next-button' onClick={(e) => this.props.onClick(false)}>No</button>
                </div>
            </div>
        )
    }
}

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

// Are you getting the help you need QUESTION
export class GettingHelpQ extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.help}</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>Yes</button>
                    <button className='next-button' onClick={(e) => this.props.onClick(false)}>No</button>
                </div>
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
            showModalCrisis: false,
            showModalRoots: false,
            showModalGP: false
        }

        this.handleOpenModalGrounding = this.handleOpenModalGrounding.bind(this);
        this.handleCloseModalGrounding = this.handleCloseModalGrounding.bind(this);
        this.handleOpenModal999 = this.handleOpenModal999.bind(this);
        this.handleCloseModal999 = this.handleCloseModal999.bind(this);
        this.handleOpenModalCrisis = this.handleOpenModalCrisis.bind(this);
        this.handleCloseModalCrisis = this.handleCloseModalCrisis.bind(this);
        this.handleOpenModalRoots = this.handleOpenModalRoots.bind(this);
        this.handleCloseModalRoots = this.handleCloseModalRoots.bind(this);
        this.handleOpenModalGP = this.handleOpenModalGP.bind(this);
        this.handleCloseModalGP = this.handleCloseModalGP.bind(this);
    }

    handleOpenModalGrounding() {
        this.setState({ showModalGrounding: true });
    }

    handleCloseModalGrounding() {
        this.setState({ showModalGrounding: false });
    }

    handleOpenModalRoots() {
        this.setState({ showModalRoots: true });
    }

    handleCloseModalRoots() {
        this.setState({ showModalRoots: false });
    }

    handleOpenModal999() {
        this.setState({ showModal999: true });
    }

    handleCloseModal999() {
        this.setState({ showModal999: false });
    }

    handleOpenModalCrisis() {
        this.setState({ showModalCrisis: true });
    }

    handleCloseModalCrisis() {
        this.setState({ showModalCrisis: false });
    }

    handleOpenModalGP() {
        this.setState({ showModalCrisis: true });
    }

    handleCloseModalGP() {
        this.setState({ showModalCrisis: false });
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
                        <button onClick={this.handleOpenModalRoots} className='next-button'>Reach out to Supporters / Roots</button>
                        <button onClick={this.handleOpenModalGP} className='next-button'>Reach out to GP / Support Worker</button>
                        <button onClick={this.handleOpenModalCrisis} className='next-button'>Call Bristol Mental Health Crisis Team: 0300 555 0334</button>
                        <button onClick={this.handleOpenModal999} className='next-button'>Ring 999 or go to A & E</button>

                        <ReactModal
                            isOpen={this.state.showModalGrounding}
                            ariaHideApp={false}
                        >
                            <button onClick={this.handleCloseModalGrounding}>X</button>
                            {SetExercises('grounding')}
                        </ReactModal>

                        <ReactModal
                            isOpen={this.state.showModalRoots}
                            ariaHideApp={false}
                        >
                            <button onClick={this.handleCloseModalRoots}>X</button>
                            <AllRoots />
                        </ReactModal>

                        <ReactModal
                            isOpen={this.state.showModalGP}
                            ariaHideApp={false}
                        >
                            <button onClick={this.handleCloseModalGP}>X</button>
                            <h1 className='info-box-title'>{data[7].firstAid.options.GP}</h1>
                        </ReactModal>

                        <ReactModal
                            isOpen={this.state.showModalCrisis}
                            ariaHideApp={false}
                        >
                            <button onClick={this.handleCloseModalCrisis}>X</button>
                            <h1 className='info-box-title'>{data[7].firstAid.options.crisisTeam}</h1>
                        </ReactModal>

                        <ReactModal
                            isOpen={this.state.showModal999}
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

// show list of roots (anchors) and with a next button
export class AllRootsWithNext extends React.Component {
    render() {
        return (
            <div className='info-box'>
                <h1 className='info-box-title'>[NEEDS DOING - LIST OF ROOTS GOES HERE]</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>next</button>
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

