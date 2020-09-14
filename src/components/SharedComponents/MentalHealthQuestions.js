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
