import React from 'react';
import BackgroundAnimation from '../Animations/BackgroundAnimation'
import ForegroundAnimation from '../Animations/ForegroundAnimation'

export class LandingPage extends React.Component {

    onNext = () => {
        this.props.history.push('/choosesymbol');
    };

    render() {
        let script = require('../../../src/data/script.json');
        let question = (script[0].intro[1]);
        return (
            <div>
            <div className='background-anim'>
            <BackgroundAnimation />
            </div>
            <div className='foreground-anim'>
            <ForegroundAnimation />
            </div>
            <div className='info-box'>
            <h1 className='info-box-text'>{ question }</h1>
            <div className='info-box-button'>
            <button onClick={this.onNext}>next</button>
            </div>
            </div>
            </div>
        );
    }
}

export default LandingPage;
