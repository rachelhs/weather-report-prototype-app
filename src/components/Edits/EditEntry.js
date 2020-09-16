import React from 'react';
import { connect } from 'react-redux';
import EntryFormSecondaryWords from './EntryFormSecondaryWords';
import EntryFormWords from './EntryFormWords'
import { startEditEntry, startRemoveEntry } from '../../actions/entries';
import BackgroundAnimation from '../Animations/BackgroundAnimation'
import ForegroundAnimation from '../Animations/ForegroundAnimation'
const data = require('../../data/data.json');

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
        this.props.history.push('/5');
    };

    render() {
        return (
            <div className='background-box'>
                <div className='background-anim'>
                    <BackgroundAnimation />
                </div>
                <div className='foreground-anim'>
                    <ForegroundAnimation />
                </div>
                <div className='info-box-landing info-box-words'>
                    {
                        (this.state.viewOne) ? <h3 className='info-box-text-small-padding'>{ data[0].regularLogin[3] }</h3> : <h3 className='info-box-text-small-padding'>{ data[0].regularLogin[4] }</h3>
                    }
                    {
                        (this.state.viewOne) ? <div><EntryFormWords entry={this.props.entry} onSubmit={this.onSubmit} /> 
                        <div className='info-box-button'>
                            <button className='next-button' onClick={this.onNext}>NEXT</button>
                        </div>
                        </div> : 
                        <div><EntryFormSecondaryWords entry={this.props.entry} onSubmit={this.onSubmit} /> 

                            <div className='info-box-button'>
                                <button className='next-button' onClick={this.onFinal}>NEXT</button>
                            </div>
                        </div>
                    }
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