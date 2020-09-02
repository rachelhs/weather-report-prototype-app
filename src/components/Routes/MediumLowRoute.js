import React from 'react';
import { LowAcknowledgement, AnimationsCombined, FadeOut, FadeIn, isLongerThanThreeDays} from '../../actions/route-functions'

const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';


class MediumLowRoute extends React.Component {

    componentWillMount() {
        isLongerThanThreeDays(firebase.auth().currentUser)
        console.log('return', isLongerThanThreeDays(firebase.auth().currentUser))
    }


    render() {
        return (
            <div className='background-box'>
                <AnimationsCombined />
                <div className='info-box'>
                    <FadeOut delay={3000}>
                        <LowAcknowledgement />
                    </FadeOut>
                    {/* <p>{this.state.toggleHowLong}</p> */}
                    {/* <FadeIn delay={5000}>
                        <h1>What had led you to feeling this way?</h1>
                    </FadeIn> */}
                    {/* <div className='info-box-button'>
                        <button className='next-button' onClick={this.onNext}>next</button>
                    </div> */}
                </div>
            </div>
        );
    }
}

export default MediumLowRoute;