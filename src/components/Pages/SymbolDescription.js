import React from 'react';
import moment from 'moment';
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';
const data = require('../../data/data.json');
import { AnimationsCombined } from '../SharedComponents/SharedComponents';

export default class SymbolDescription extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     weatherSymbol: props.entry ? props.entry.weatherSymbol : '',
    //     //     note: props.entry ? props.entry.note : '',
    //     //     createdAt: props.entry ? moment(props.entry.createdAt) : moment(),
    //     //     mainWord: '',
    //     //     secondWord: '',
    //     //     thirdWord: '', 
    //     //     calendarFocused: false,
    //     //     error: ''
    //     // }
    // }

    // onSubmitMainWord = mainWord => e => {
    //     e.preventDefault();
    //     //get current user
    //     const user = firebase.auth().currentUser;
    //     const uid = user.uid;
    //     let name = '';
    //     //get id for the new entry
    //     database.ref(`users/${uid}/entries`).orderByChild('createdAt').limitToLast(1).on('child_added', function (snapshot) {
    //         name = snapshot.key;
    //     })
    //     database.ref(`users/${uid}/entries/${name}`).update({
    //         mainWord: mainWord
    //     })

    // }

    render() {
        return (
            <div className='background-box'>
                <AnimationsCombined />
                <div className='info-box-landing info-box-words'>
                    <h3 className='info-box-text-small-padding'>{ data[0].regularLogin[3] }</h3>
                    <div className='word-grid'>
                        {data[10].words.rainbow.map((note) => (
                            <form className='words'>
                                <button className='symbol-button-border'>{note}</button>
                            </form>
                        ))}
                    </div>
                </div>
            </div>
            
        )
    }
}