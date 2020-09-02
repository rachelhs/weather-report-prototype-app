import React from 'react';
import BackgroundAnimation from '../Animations/BackgroundAnimation'
import ForegroundAnimation from '../Animations/ForegroundAnimation'
import { Link } from 'react-router-dom';
 
export class AllRoutesPage extends React.Component {

    onNext = () => {
        this.props.history.push('/choosesymbol');
    };

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
                    <h1 className='info-box-text'>{ question }</h1>
                    <div className='info-box-button'>
                        <Link to="/5">Low</Link>
                    </div>
                    <div className='info-box-button'>
                        <Link to="/4">Medium Low</Link>
                    </div>

                </div>
            </div>
        );
    }
}

export default AllRoutesPage;
