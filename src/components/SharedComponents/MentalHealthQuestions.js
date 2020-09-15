// FILE CONTAINING COMPONENTS WHICH ARE SHARED ACROSS PATHS
import React from 'react';
const data = require('../../data/data.json');
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';


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

// What’s one small thing you can do to make yourself feel better?
export class PositiveChangeQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = { valuePos: '' };
        this.handlepositiveChangeSubmit = this.handlepositiveChangeSubmit.bind(this);
    }

    handlepositiveChangeSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        database.ref(`users/${uid}/positiveChange`).push(this.state.valuePos);
    }

    handlepositiveChange = (e) => {
        this.setState({ valuePos: e.target.value });
    }

    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[3].shared.positiveChange}</h1>
                <form className='button-container' onSubmit={this.handlepositiveChangeSubmit}>
                    <input className='free-form-input' type="text" value={this.state.value} onChange={this.handlepositiveChange} />
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

// What three things are you grateful for?
export class GratefulQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gratefulOne: '',
            gratefulTwo: '',
            gratefulThree: '' 
        };
        this.handlegratefulQuestionSubmit = this.handlegratefulQuestionSubmit.bind(this);
    }

    handlegratefulQuestionSubmit = (e) => {
        e.preventDefault();
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        database.ref(`users/${uid}/grateful`).push(this.state.gratefulOne);
        database.ref(`users/${uid}/grateful`).push(this.state.gratefulTwo);
        database.ref(`users/${uid}/grateful`).push(this.state.gratefulThree);
    }

    handlegratefulOne = (e) => {
        this.setState({ gratefulOne: e.target.value });
    }

    handlegratefulTwo = (e) => {
        this.setState({ gratefulTwo: e.target.value });
    }

    handlegratefulThree = (e) => {
        this.setState({ gratefulThree: e.target.value });
    }

    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[3].shared.gratefulQuestion}</h1>
                <form className='button-container-vertical' onSubmit={this.handlegratefulQuestionSubmit}>
                    <input className='free-form-input-vertical' placeholder="1" type="text" onChange={this.handlegratefulOne} />
                    <input className='free-form-input-vertical' placeholder="2" type="text" onChange={this.handlegratefulTwo} />
                    <input className='free-form-input-vertical' placeholder="3" type="text" onChange={this.handlegratefulThree} />
                    <button className='next-button free-form-submit' onClick={this.props.buttonClick}>NEXT</button>
                </form>
            </div>
        )
    }
}

// What 3 things do you do to take care of yourself to keep you well? (eg, shower etc.)
export class TakeCareQuestion
 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            takeCareOne: '',
            takeCareTwo: '',
            takeCareThree: ''  
        };
        this.handleTakeCareQuestionSubmit = this.handleTakeCareQuestionSubmit.bind(this);
    }

    handleTakeCareQuestionSubmit = (e) => {
        e.preventDefault();
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        database.ref(`users/${uid}/takeCare`).push(this.state.takeCareOne);
        database.ref(`users/${uid}/takeCare`).push(this.state.takeCareTwo);
        database.ref(`users/${uid}/takeCare`).push(this.state.takeCareThree);
    }

    handletakeCareOne = (e) => {
        this.setState({ takeCareOne: e.target.value });
    }

    handletakeCareTwo = (e) => {
        this.setState({ takeCareTwo: e.target.value });
    }

    handletakeCareThree = (e) => {
        this.setState({ takeCareThree: e.target.value });
    }

    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[3].shared.takeCareQuestion}</h1>
                <form className='button-container-vertical' onSubmit={this.handleTakeCareQuestionSubmit}>
                    <input className='free-form-input-vertical' placeholder="1" type="text" onChange={this.handletakeCareOne} />
                    <input className='free-form-input-vertical' placeholder="2" type="text" onChange={this.handletakeCareTwo} />
                    <input className='free-form-input-vertical' placeholder="3" type="text" onChange={this.handletakeCareThree} />
                    <button className='next-button free-form-submit' onClick={this.props.buttonClick}>NEXT</button>
                </form>
            </div>
        )
    }
}