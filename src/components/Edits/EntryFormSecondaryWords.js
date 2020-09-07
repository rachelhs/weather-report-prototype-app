import React from 'react';
import moment from 'moment';
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';

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
                    <button className={'word-button'}>happy</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('manic')}>
                    <button className={'word-button'}>manic</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('over stimulated')}>
                    <button className={'word-button'}>over stimulated</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('excited')}>
                    <button className='word-button'>excited</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('love or loved')}>
                    <button className='word-button'>love or loved</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('adventurous')}>
                    <button className='word-button'>adventurous</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('brave')}>
                    <button className='word-button'>brave</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('confident')}>
                    <button className='word-button'>confident</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('energetic')}>
                    <button className='word-button'>energetic</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('hopeful')}>
                    <button className='word-button'>hopeful</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('creative')}>
                    <button className='word-button'>creative</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('kind')}>
                    <button className='word-button'>kind</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('content')}>
                    <button className='word-button'>content</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('nostalgic')}>
                    <button className='word-button'>nostalgic</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('invincible')}>
                    <button className='word-button'>invincible</button>
                </form>
                <form className='words' onSubmit={this.onSubmitSecondWord('careless')}>
                    <button className='word-button'>careless</button>
                </form>
            </div>
        )
    }
}