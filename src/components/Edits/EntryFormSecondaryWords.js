import React from 'react';
import moment from 'moment';
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';
const data = require('../../data/data.json');

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
                {data[10].secondaryWords.happy.map((note) => (
                    <form className='words' onSubmit={this.onSubmitSecondWord({note})}>
                        <button className='symbol-button-border'>{note}</button>
                    </form>
                ))}
            </div>
        )
    }
}