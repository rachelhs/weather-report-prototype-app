import React from 'react';
import { connect } from 'react-redux';
import EntryForm from './EntryForm'
import { startEditEntry, startRemoveEntry } from '../actions/entries';

export class EditEntryPage extends React.Component {
    onSubmit = (entry) => {
        // this.props.startEditEntry(this.props.entry.id, entry);
        // this.props.history.push('/');
        database.ref('rz5Oy01H4nQ7NAvSqsfHQkQygcl1/entries/MFAEOzkAZxz_n2FpnQl').update({
            weatherSymbol: "sun"
        });
    };
    onRemove = () => {
        this.props.startRemoveEntry({ id: this.props.entry.id });
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
            <div className="page-header">
            <div className="content-container"><h1 className="page-header__title">Save</h1></div>
            </div>
            <div className="content-container">
            <EntryForm
                entry={this.props.entry}
                onSubmit={this.onSubmit}
            />
            </div><div className="content-container">
            <button className="button button--secondary" onClick={this.onRemove}>Remove Entry</button>
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