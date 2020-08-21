import React from 'react';
import moment from 'moment';

export default class EntryFormWords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherSymbol: props.entry ? props.entry.weatherSymbol : '',
            note: props.entry ? props.entry.note : '',
            createdAt: props.entry ? moment(props.entry.createdAt) : moment(),
            words: [],
            calendarFocused: false,
            error: ''
        }
    }

    onSubmitHappy = (e) => {
        e.preventDefault();
        this.setState(() => ({ error: "" }));
        this.props.onSubmit({
            weatherSymbol: this.state.weatherSymbol,
            createdAt: this.state.createdAt.valueOf(),
            note: this.state.note,
            words: ["happy", "word2", "word3"]
        });

    }

    render() {
        return (
            <div className='weather-symbols-grid'>
                <form className='symbol' onSubmit={this.onSubmitHappy}>
                        <button className='symbol-button'><img className='symbol'/>happy</button>
                </form>
            </div>
        )
    }
}