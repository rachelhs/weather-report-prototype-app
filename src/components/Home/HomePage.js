import React from 'react';
import BackgroundAnimation from '../Animations/BackgroundAnimation'
import ForegroundAnimation from '../Animations/ForegroundAnimation'

export class HomePage extends React.Component {

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
            <h1 className='info-box-text'>HOME</h1>
            </div>
            </div>
        );
    }
}

export default HomePage;
