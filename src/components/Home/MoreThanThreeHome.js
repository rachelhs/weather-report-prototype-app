import React from 'react';
import BackgroundAnimation from '../Animations/BackgroundAnimation'
import ForegroundAnimation from '../Animations/ForegroundAnimation'
import { Link } from 'react-router-dom';


export class ThreeHomePage extends React.Component {

    render() {
        
        return (
            <div className='background-box'>
                <div className='background-anim'>
                    <BackgroundAnimation />
                </div>
                <div className='foreground-anim'>
                    <ForegroundAnimation />
                </div>
                <div className='info-box-landing'>
                    <h1 className='info-box-text-padding-top'>You have registered how you're feeling more than three times today.</h1>
                    <p>From feedback, we have set a limit on entering this 3 times a day</p>
                    <p>You can go to the home page</p>
                    <div className="button-container">
                        <Link to={{ pathname: '/home' }} className='next-button'>Go to home</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ThreeHomePage;
