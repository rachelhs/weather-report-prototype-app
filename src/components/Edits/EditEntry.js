import React from 'react';
import { connect } from 'react-redux';
import EntryFormSecondaryWords from './EntryFormSecondaryWords';
import EntryFormWords from './EntryFormWords'
import { startEditEntry, startRemoveEntry } from '../../actions/entries';
import BackgroundAnimation from '../Animations/BackgroundAnimation'
import ForegroundAnimation from '../Animations/ForegroundAnimation'

export class EditEntryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewOne: true
        };

        this.onNext = this.onNext.bind(this);
    }

    onSubmit = (entry) => {
        this.props.startEditEntry(this.props.entry.id, entry);
        this.props.history.push('/');
    };

    onNext = () => {
        this.setState({ viewOne: false });
    };

    onFinal = () => {
        this.props.history.push('/');
    };

    render() {
        let script = require('../../../src/data/script.json');
        let question1 = (script[0].intro[3]);
        let question2 = (script[0].intro[4]);
        return (
            <div>
            <div className='background-anim'>
            <BackgroundAnimation />
            </div>
            <div className='foreground-anim'>
            <ForegroundAnimation />
            </div>
            <div className='info-box'>
            {(this.state.viewOne) ? <h4 className='info-box-text'>{question1}</h4> :
            <h4 className='info-box-text'>{question2}</h4>
        }
            {(this.state.viewOne) ? <div><EntryFormWords entry={this.props.entry} onSubmit={this.onSubmit} /> 
            <div className='info-box-button'>
            <button onClick={this.onNext}>next</button>
            </div></div> : <div><EntryFormSecondaryWords entry={this.props.entry} onSubmit={this.onSubmit} /> 
            <div className='info-box-button'>
            <button onClick={this.onFinal}>next</button>
            </div>
            </div>    }
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