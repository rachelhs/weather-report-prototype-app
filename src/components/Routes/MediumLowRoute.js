import React from 'react';
import { LowAcknowledgement, AnimationsCombined, FadeOut, FadeIn } from '../SharedComponents/SharedComponents';
import { isLongerThanThreeDays } from '../../actions/route-functions';

class MediumLowRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            LongerThanThree: false
        }
      }

    componentDidMount = () => {
      isLongerThanThreeDays(res => {
        this.setState({
            LongerThanThree: res
        })
        console.log('result', res)
      });
    }

    onHowLongAnswered = () => {
        this.setState({ HowLongAnswered: true });
        console.log('clicked next', this.state.HowLongAnswered)
    }


    render() {
        console.log('state', this.state.LongerThanThree)
        let script = require('../../data/script.json');
        let text;
        console.log('longer than three', this.state.LongerThanThree)

        if (this.state.LongerThanThree) {
            text =   
            <div className='info-box'>
                <h1>{script[0].low[2]}</h1>
            </div>
        };
        if (!this.state.LongerThanThree || this.state.HowLongAnswered){
            text = 
            <div className='info-box'>
                <h1>{script[0].low[3]}</h1>
                <button className='next-button' onClick={this.onHowLongAnswered}>next</button>
            </div>
        }
        return (
            <div className='background-box'>
                <AnimationsCombined />
                <div className='info-box'>
                    <FadeOut delay={500}>
                        <LowAcknowledgement />
                    </FadeOut>
                    <FadeIn delay={5000}>
                        <div>
                            {text}
                        </div>
                    </FadeIn>
                </div>
            </div>
        );
    }
}

export default MediumLowRoute;