import React from 'react';
import { Link } from 'react-router-dom';
import { AnimationsLayered } from '../SharedComponents/SharedComponents';


export class ThreeHomePage extends React.Component {

    render() {
        
        return (
            <div className='background-box'>
                <AnimationsLayered speeds={[0]} animations={['neutralBackground']} />
                <div className='background-box'></div>
                <div className='info-box'>
                    <h2>You’ve entered your inner weather 3 times today, that is the limit for each day. You can look back at past memories, your support network or things you are grateful for on the home page.</h2>
                    <h2>See you tomorrow!</h2>
                    <div className="button-container">
                        <Link to={{ pathname: '/home' }} className='next-button-dark extra-side-padding-button'>Go to home</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ThreeHomePage;
