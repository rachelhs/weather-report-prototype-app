import React from 'react';
import EntryForm from './EntryForm';
import { connect } from 'react-redux';
import { startAddEntry } from '../actions/entries'
import BackgroundAnimation from './BackgroundAnimation'
import ForegroundAnimation from './ForegroundAnimation'

export class ChooseSymbolPage extends React.Component {
    onSubmit = (entry) => {
        this.props.startAddEntry(entry);
        this.props.history.push('/edit/-MFAEOzkAZxz_n2FpnQl');
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

const mapDispatchToProps = (dispatch) => ({

    startAddEntry: (entry) => dispatch(startAddEntry(entry))

});

export default connect(undefined, mapDispatchToProps)(ChooseSymbolPage);
