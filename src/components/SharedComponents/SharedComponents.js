// FILE CONTAINING COMPONENTS WHICH ARE SHARED ACROSS PATHS
import React from 'react';
import BackgroundAnimation from '../../components/Animations/BackgroundAnimation'
import ForegroundAnimation from '../../components/Animations/ForegroundAnimation'
const data = require('../../data/data.json');
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';

// words
export class LowAcknowledgement extends React.Component {
    render() {
        return (
            <h1 className='info-box-title'>{ data[3].shared.acknowledge }</h1>
        )
    }
}

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
            <h1 className='info-box-title'>{ data[3].shared.howLong }</h1>
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

export class ReasonForFeelings extends React.Component {

    render() {
        return (
            <div>
                <h1 className='info-box-title'>{ data[3].shared.reason }</h1>
                <div className='button-container'>
                    <button className='next-button' onClick={(e) => this.props.onClick(true)}>Yes</button>
                    <button className='next-button' onClick={(e) => this.props.onClick(false)}>No</button>
                </div>
            </div>
        )
    }
}

export class ReasonForFeelingsInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleNoteSubmit = this.handleNoteSubmit.bind(this);
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

