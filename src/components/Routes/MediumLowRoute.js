import React from 'react';
import { LowAcknowledgement, AnimationsCombined, FadeOut, FadeIn, doSomething, isLongerThanThreeDays} from '../../actions/route-functions'
import { IsLonger } from '../FunctionalRouteComponents/IsLonger'

const firebase = require('firebase/app');
require('firebase/auth');


class MediumLowRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {LongerThanThree: false}
      }

    componentWillMount() {
        // var x = isLongerThanThreeDays(firebase.auth().currentUser)
        // console.log('x', x)
        var number = doSomething(1)
        console.log('variable', number)
    }


    render() {
        let user = firebase.auth().currentUser
        return (
            <div className='background-box'>
                <AnimationsCombined />
                <div className='info-box'>
                    <FadeOut delay={500}>
                        <LowAcknowledgement />
                    </FadeOut>
                    <IsLonger user={user} />
                    {console.log(this.state.LongerThanThree)}
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