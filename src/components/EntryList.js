import React from 'react';
import { connect } from 'react-redux';
import EntryListItem from './EntryListItem';
import selectEntries from '../selectors/entries';

export const EntryList = (props) => (
    <div className="content-container">
    <div className="list-header">
    <div className="show-for-mobile">Entry</div>
    <div className="show-for-desktop">Entry</div>
    <div className="show-for-desktop">Intensity</div>
    </div>
       <div className="list-body">
       {
        props.entries.length === 0 ? (
            <div className="list-item list-item--message">
            <span>No entries</span>
            </div>
        ) : (
                props.entries.map((entry) => {
                    return <EntryListItem key={entry.id} {...entry} />
                })
            )
    }
       </div>
    </div>
);
const mapStateToProps = (state) => {
    return {
        entries: selectEntries(state.entries, state.filters)
    };
};

export default connect(mapStateToProps)(EntryList);