import React from 'react';
import BackgroundAnimation from '../Animations/BackgroundAnimation'
import ForegroundAnimation from '../Animations/ForegroundAnimation'
import { Link } from 'react-router-dom';

export class AllRoutesPage extends React.Component {

    render() {
        let script = require('../../data/script.json');
        let question = (script[0].intro[1]);
        return (
            <div className='background-box'>
                <div className='background-anim'>
                    <BackgroundAnimation />
                </div>
                <div className='foreground-anim'>
                    <ForegroundAnimation />
                </div>
                <div className='info-box'>
                    <h1 className='info-box-text'>{question}</h1>
                    <div className='info-box-button'>
                        <Link to="/5">Low</Link>
                    </div>
                    <div className='info-box-button'>
                        <Link to="/6">Medium Low</Link>
                    </div>
                    <div className='info-box-button'>
                        <Link to="/7">Very Low</Link>
                    </div>
                    <div className='info-box-button'>
                        <Link to="/8">Low but with Energy</Link>
                    </div>
                    <div className='info-box-button'>
                        <Link to="/9">Suicidal</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default AllRoutesPage;
