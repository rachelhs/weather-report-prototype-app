import React from 'react';
import BackgroundAnimation from './BackgroundAnimation'
import ForegroundAnimation from './ForegroundAnimation'

export class LandingPage extends React.Component {

    onNext = () => {
        this.props.history.push('/choosesymbol');
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
            <h1 className='info-box-text'>Think About How You Are Feeling</h1>
            <div className='info-box-button'>
            <button onClick={this.onNext}>next</button>
            </div>
            </div>
            </div>
        );
    }
}

export default LandingPage;
