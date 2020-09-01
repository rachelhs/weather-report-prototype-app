import React from 'react';
import BackgroundAnimation from '../Animations/BackgroundAnimation'
import ForegroundAnimation from '../Animations/ForegroundAnimation'
const firebase = require('firebase/app');
require('firebase/auth');
//functions
import { isLongerThanThreeDays } from '../../actions/functions-in-routes';

//get asked questions 1 and 2
//excercises - 3 x replays - grateful, positive memory, things you like about yourself

export class LowRoute extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewNumber: 1,
            toggleHowLong: false
        };
        this.onNext = this.onNext.bind(isLongerThanThreeDays(firebase.auth().currentUser));
        // this.isLongerThanThreeDays = this.isLongerThanThreeDays.bind(this);
    }

    onNext = () => {
        console.log('next');
        this.setState({ viewNumber: this.state.viewNumber + 1 });
    };

    componentDidMount = () => {
        // console.log('tooglebefore', toogleHowLong);
        isLongerThanThreeDays(firebase.auth().currentUser);
        // console.log('toogleafter', toogleHowLong);
    }

    render() {
        let script = require('../../../src/data/script.json');
        let question1 = (script[0].low[1]);
        let question2 = (script[0].low[2]);
        let question3 = (script[0].low[3]);
        let question4 = (script[0].low[4]);

        return (
            <div className='background-box'>
                <div className='background-anim'>
                    <BackgroundAnimation />
                </div>
                <div className='foreground-anim'>
                    <ForegroundAnimation />
                </div>
                <div className='info-box'>
                    {
                        (this.state.viewNumber == 1) ? <h1 className='info-box-text'>{ question1 }</h1> :
                        (this.state.viewNumber == 2 && this.state.toggleHowLong == true) ? <h1 className='info-box-text'>{ question2 }</h1> : 
                        (this.state.viewNumber == 2 && this.state.toggleHowLong == false) ? <h1 className='info-box-text'>{ question3 }</h1> :
                        ''
                    }
                    <div className='info-box-button'>
                        <button className='next-button' onClick={this.onNext}>next</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LowRoute;
