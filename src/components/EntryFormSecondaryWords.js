import React from 'react';
import moment from 'moment';
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../firebase/firebase';

export default class EntryFormSecondaryWords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherSymbol: props.entry ? props.entry.weatherSymbol : '',
            note: props.entry ? props.entry.note : '',
            createdAt: props.entry ? moment(props.entry.createdAt) : moment(),
            mainWord: '',
            secondWord: '',
            thirdWord: '',
            calendarFocused: false,
            error: '',
            clickedOnce: true
        }
        this.onSubmitSecondWord = this.onSubmitSecondWord.bind(this);
    }

    onSubmitSecondWord = secondWord => e => {
        e.preventDefault();
        //get current user
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let name = '';
        //get id for the new entry
        database.ref(`users/${uid}/entries`).orderByChild('createdAt').limitToLast(1).on('child_added', function (snapshot) {
            name = snapshot.key;
        })
        if (this.clickedOnce) {
            database.ref(`users/${uid}/entries/${name}`).update({
                secondWord: secondWord
            })
        this.clickedOnce = false;
        }
        else {
            database.ref(`users/${uid}/entries/${name}`).update({
                thirdWord: secondWord
            })
        this.clickedOnce = true;
        }
    }

    render() {
        return (
            <div className='word-grid'>
                <form className='words' onSubmit={this.onSubmitSecondWord('happy')}>
                    <button className='symbol-button'>happy</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('manic')}>
                    <button className='symbol-button'>manic</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('over stimulated')}>
                    <button className='symbol-button'>over stimulated</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('excited')}>
                    <button className='symbol-button'>excited</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('love or loved')}>
                    <button className='symbol-button'>love or loved</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('adventurous')}>
                    <button className='symbol-button'>adventurous</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('brave')}>
                    <button className='symbol-button'>brave</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('confident')}>
                    <button className='symbol-button'>confident</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('energetic')}>
                    <button className='symbol-button'>energetic</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('hopeful')}>
                    <button className='symbol-button'>hopeful</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('creative')}>
                    <button className='symbol-button'>creative</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('kind')}>
                    <button className='symbol-button'>kind</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('content')}>
                    <button className='symbol-button'>content</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('nostalgic')}>
                    <button className='symbol-button'>nostalgic</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('invincible')}>
                    <button className='symbol-button'>invincible</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('careless')}>
                    <button className='symbol-button'>careless</button>
                </form>
            </div>
        )
    }
}