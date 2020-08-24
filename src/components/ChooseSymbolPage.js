import React from 'react';
import EntryForm from './EntryForm';
import { connect } from 'react-redux';
import { startAddEntry, startEditEntry } from '../actions/entries'
import BackgroundAnimation from './BackgroundAnimation'
import ForegroundAnimation from './ForegroundAnimation'
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../firebase/firebase';

export class ChooseSymbolPage extends React.Component {
    onSubmit = (entry) => {
        //create new entry
        this.props.startAddEntry(entry);
        //get current user
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let name = '';
        //get id for the new entry
        database.ref(`users/${uid}/entries`).orderByChild('createdAt').limitToLast(1).on('child_added', function(snapshot) {
            name = snapshot.key;
        })
        //go to page for most recent entry
        this.props.history.push(`edit/${name}`);
    };

    render() {
        return (
            <div>
            <div className='background-anim'>
            <BackgroundAnimation />
            </div>
            <div className='foreground-anim'>
            <ForegroundAnimation />
            </div>
            <div className='info-box'>
            <h4 className='info-box-text'>If you were to describe that feeling in a weather symbol, which symbol would it be?</h4>
            <EntryForm
            onSubmit={this.onSubmit}
            />
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        entry: state.entries.find((entry) => entry.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch) => ({

    startAddEntry: (entry) => dispatch(startAddEntry(entry)),
    startEditEntry: (id, entry) => dispatch(startEditEntry(id, entry))


});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseSymbolPage);
