import React from 'react';
import BackgroundAnimation from '../Animations/BackgroundAnimation'
import ForegroundAnimation from '../Animations/ForegroundAnimation'
const data = require('../../data/data.json');

export class LandingPage extends React.Component {

    onNext = () => {
        this.props.history.push('/choosesymbol');
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
                <div className='info-box'>
                    <h1 className='info-box-text-padding-top'>{ data[0].regularLogin[1] }</h1>
                    <div className="button-container">
                        <button className='next-button' onClick={this.onNext}>NEXT</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;
