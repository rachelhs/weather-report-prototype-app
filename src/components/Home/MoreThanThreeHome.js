import React from 'react';
import { Link } from 'react-router-dom';
import { AnimationsLayered } from '../SharedComponents/SharedComponents';


export class ThreeHomePage extends React.Component {

    render() {
        
        return (
            <div className='background-box'>
                <AnimationsLayered speeds={[0]} animations={['neutralBackground']} />
                <div className='info-box-landing'>
                    <h1 className='info-box-text-padding-top'>You have registered how you're feeling more than three times today.</h1>
                    <p>From feedback, we have set a limit on entering this 3 times a day</p>
                    <p>You can go to the home page</p>
                    <div className="button-container">
                        <Link to={{ pathname: '/home' }} className='next-button-dark'>Go to home</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ThreeHomePage;
