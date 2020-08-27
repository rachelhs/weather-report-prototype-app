import React from 'react';
import moment from 'moment';
import rainbow from '../../images/rainbow.png';
import sun from '../../images/sun.png';
import bluesky from '../../images/bluesky.jpeg';
import fog from '../../images/fog.png';
import greycloud from '../../images/greycloud.png';
import darkcloud from '../../images/darkcloud.svg';
import thunder from '../../images/thunder.png';
import tidalwave from '../../images/tidalwave.png';
import tornado from '../../images/tornado.png';

export default class EntryForm extends React.Component {
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
            error: ''
        }
    }

    onSubmitR = (e) => {
        e.preventDefault();
        this.setState(() => ({ error: "" }));
        this.props.onSubmit({
            weatherSymbol: "rainbow",
            createdAt: this.state.createdAt.valueOf(),
            note: this.state.note,
            mainWord: '',
            secondWord: '',
            thirdWord: ''
        });

    }
    onSubmitS = (e) => {
        e.preventDefault();
        this.setState(() => ({ error: "" }));
        this.props.onSubmit({
            weatherSymbol: "sunshine",
            createdAt: this.state.createdAt.valueOf(),
            note: this.state.note,
            mainWord: '',
            secondWord: '',
            thirdWord: ''
        });

    }
    onSubmitBS = (e) => {
        e.preventDefault();
        this.setState(() => ({ error: "" }));
        this.props.onSubmit({
            weatherSymbol: "blue sky",
            createdAt: this.state.createdAt.valueOf(),
            note: this.state.note,
            mainWord: '',
            secondWord: '',
            thirdWord: ''        });

    }
    onSubmitF = (e) => {
        e.preventDefault();
        this.setState(() => ({ error: "" }));
        this.props.onSubmit({
            weatherSymbol: "fog",
            createdAt: this.state.createdAt.valueOf(),
            note: this.state.note,
            mainWord: '',
            secondWord: '',
            thirdWord: ''        });

    }
    onSubmitGC = (e) => {
        e.preventDefault();
        this.setState(() => ({ error: "" }));
        this.props.onSubmit({
            weatherSymbol: "grey cloud",
            createdAt: this.state.createdAt.valueOf(),
            note: this.state.note,
            mainWord: '',
            secondWord: '',
            thirdWord: ''        });

    }
    onSubmitDC = (e) => {
        e.preventDefault();
        this.setState(() => ({ error: "" }));
        this.props.onSubmit({
            weatherSymbol: "dark cloud",
            createdAt: this.state.createdAt.valueOf(),
            note: this.state.note,
            mainWord: '',
            secondWord: '',
            thirdWord: ''        });

    }
    onSubmitT = (e) => {
        e.preventDefault();
        this.setState(() => ({ error: "" }));
        this.props.onSubmit({
            weatherSymbol: "thunder",
            createdAt: this.state.createdAt.valueOf(),
            note: this.state.note,
            mainWord: '',
            secondWord: '',
            thirdWord: ''        });

    }
    onSubmitTW = (e) => {
        e.preventDefault();
        this.setState(() => ({ error: "" }));
        this.props.onSubmit({
            weatherSymbol: "tidal wave",
            createdAt: this.state.createdAt.valueOf(),
            note: this.state.note,
            mainWord: '',
            secondWord: '',
            thirdWord: ''        });

    }
    onSubmitTO = (e) => {
        e.preventDefault();
        this.setState(() => ({ error: "" }));
        this.props.onSubmit({
            weatherSymbol: "tornado",
            createdAt: this.state.createdAt.valueOf(),
            note: this.state.note,
            mainWord: '',
            secondWord: '',
            thirdWord: ''        });

    }

    render() {
        return (
            <div className='weather-symbols-grid'>
                <form className='symbol' onSubmit={this.onSubmitR}>
                        <button className='symbol-button'><img className='symbol' src={rainbow} /></button>
                </form>
                <form className='symbol' onSubmit={this.onSubmitS}>
                        <button className='symbol-button'><img className='symbol' src={sun} /></button>
                </form>
                <form className='symbol' onSubmit={this.onSubmitBS}>
                        <button className='symbol-button'><img className='symbol' src={bluesky} /></button>
                </form>
                <form className='symbol' onSubmit={this.onSubmitF}>
                        <button className='symbol-button'><img className='symbol' src={fog} /></button>
                </form>
                <form className='symbol' onSubmit={this.onSubmitGC}>
                        <button className='symbol-button'><img className='symbol' src={greycloud} /></button>
                </form>
                <form className='symbol' onSubmit={this.onSubmitDC}>
                        <button className='symbol-button'> <img className='symbol' src={darkcloud} /></button>
                </form>
                <form className='symbol' onSubmit={this.onSubmitT}>
                        <button className='symbol-button'><img className='symbol' src={thunder} /></button>
                </form>
                <form className='symbol' onSubmit={this.onSubmitTW}>
                        <button className='symbol-button'><img className='symbol' src={tidalwave} /></button>
                </form>
                <form className='symbol' onSubmit={this.onSubmitTO}>
                        <button className='symbol-button'><img className='symbol' src={tornado} /></button>
                </form>
            </div>
        )
    }
}