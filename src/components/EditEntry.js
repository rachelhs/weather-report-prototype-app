import React from 'react';
import { connect } from 'react-redux';
import EntryFormWords from './EntryFormWords'
import { startEditEntry, startRemoveEntry } from '../actions/entries';
import BackgroundAnimation from './BackgroundAnimation'
import ForegroundAnimation from './ForegroundAnimation'

export class EditEntryPage extends React.Component {
    onSubmit = (entry) => {
        this.props.startEditEntry(this.props.entry.id, entry);
        this.props.history.push('/');
    };

    onNext = () => {
        this.props.history.push('/');
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
            <h4 className='info-box-text'>Choose a word that best describes that feeling?</h4>
            <EntryFormWords
                entry={this.props.entry}
                onSubmit={this.onSubmit}
            />
            <div className='info-box-button'>
            <button onClick={this.onNext}>next</button>
            </div>
            </div>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => {
    return {
        entry: state.entries.find((entry) => entry.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    startEditEntry: (id, entry) => dispatch(startEditEntry(id, entry)),
    startRemoveEntry: (data) => dispatch(startRemoveEntry(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEntryPage);