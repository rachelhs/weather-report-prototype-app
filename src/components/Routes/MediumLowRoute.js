import React from 'react';
import { LowAcknowledgement, AnimationsCombined, FadeOut, FadeIn, HowLongHaveYouFeltLikeThis } from '../SharedComponents/SharedComponents';
import { isLongerThanThreeDays } from '../../actions/route-functions';

class MediumLowRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Acknowledge: true,
            LongerThanThree: false
        }
      }

    componentDidMount() {
        isLongerThanThreeDays(res => {
            this.setState({
                LongerThanThree: res,
                Acknowledge: false
            })
            console.log('result', res)
          }, 4000);
      }


    onHowLongAnswered = () => {
        this.setState({ HowLongAnswered: true });
        console.log('clicked next', this.state.HowLongAnswered)
    }


    render() {
        console.log('LongerThanThree', this.state.LongerThanThree)
        console.log('Acknowledge', this.state.Acknowledge)

        let text;
        if (this.state.Acknowledge) {
            text = 
            <FadeOut delay={2000}>
                <LowAcknowledgement />
            </FadeOut>
        }
        if (this.state.LongerThanThree) {
            text = 
            <FadeIn delay={2000}>
                <HowLongHaveYouFeltLikeThis />
            </FadeIn>
        };
        // if (!this.state.LongerThanThree || this.state.HowLongAnswered){
        //     text = 
        //     <div className='info-box'>
        //         <h1>{script[0].low[3]}</h1>
        //         <button className='next-button' onClick={this.onHowLongAnswered}>next</button>
        //     </div>
        // }
        return (
            <div className='background-box'>
                <AnimationsCombined />
                <div className='info-box'>   
                    {text}
                </div>
            </div>
        );
    }
}

export default MediumLowRoute;