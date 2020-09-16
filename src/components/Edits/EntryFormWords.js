import React from 'react';
import moment from 'moment';
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';

export default class EntryFormWords extends React.Component {
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
            error: ''
        }
    }

    onSubmitMainWord = mainWord => e => {
        e.preventDefault();
        //get current user
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let name = '';
        //get id for the new entry
        database.ref(`users/${uid}/entries`).orderByChild('createdAt').limitToLast(1).on('child_added', function (snapshot) {
            name = snapshot.key;
        })
        database.ref(`users/${uid}/entries/${name}`).update({
            mainWord: mainWord
        })

    }

    render() {
        return (
            <div className='word-grid'>
                <form className='words' onSubmit={this.onSubmitMainWord('happy')}>
                    <button className='symbol-button-border'>happy</button>
                </form>
                <form className='words' onSubmit={this.onSubmitMainWord('manic')}>
                    <button className='symbol-button-border'>manic</button>
                </form>
                <form className='words' onSubmit={this.onSubmitMainWord('over stimulated')}>
                    <button className='symbol-button-border'>over stimulated</button>
                </form>
                <form className='words' onSubmit={this.onSubmitMainWord('excited')}>
                    <button className='symbol-button-border'>excited</button>
                </form>
                <form className='words' onSubmit={this.onSubmitMainWord('love or loved')}>
                    <button className='symbol-button-border'>love or loved</button>
                </form>
                <form className='words' onSubmit={this.onSubmitMainWord('adventurous')}>
                    <button className='symbol-button-border'>adventurous</button>
                </form>
                <form className='words' onSubmit={this.onSubmitMainWord('brave')}>
                    <button className='symbol-button-border'>brave</button>
                </form>
                <form className='words' onSubmit={this.onSubmitMainWord('confident')}>
                    <button className='symbol-button-border'>confident</button>
                </form>
                <form className='words' onSubmit={this.onSubmitMainWord('energetic')}>
                    <button className='symbol-button-border'>energetic</button>
                </form>
                <form className='words' onSubmit={this.onSubmitMainWord('hopeful')}>
                    <button className='symbol-button-border'>hopeful</button>
                </form>
                <form className='words' onSubmit={this.onSubmitMainWord('creative')}>
                    <button className='symbol-button-border'>creative</button>
                </form>
                <form className='words' onSubmit={this.onSubmitMainWord('kind')}>
                    <button className='symbol-button-border'>kind</button>
                </form>
                <form className='words' onSubmit={this.onSubmitMainWord('content')}>
                    <button className='symbol-button-border'>content</button>
                </form>
                <form className='words' onSubmit={this.onSubmitMainWord('nostalgic')}>
                    <button className='symbol-button-border'>nostalgic</button>
                </form>
                <form className='words' onSubmit={this.onSubmitMainWord('invincible')}>
                    <button className='symbol-button-border'>invincible</button>
                </form>
                <form className='words' onSubmit={this.onSubmitMainWord('careless')}>
                    <button className='symbol-button-border'>careless</button>
                </form>
            </div>
        )
    }
}