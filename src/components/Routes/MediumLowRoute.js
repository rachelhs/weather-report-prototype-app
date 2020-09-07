import React from 'react';
import { LowAcknowledgement, AnimationsCombined, FadeOut, FadeIn, HowLongHaveYouFeltLikeThis, ReasonForFeelings } from '../SharedComponents/SharedComponents';
import { isLongerThanThreeDays } from '../../actions/route-functions';
import { CSSTransition } from "react-transition-group";
import '../../styles/animation.css';

class MediumLowRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            acknowledge: true,
            LongerThanThree: null,
            counter: 0
        }
        this.updateCounter = this.updateCounter.bind(this);
      }

    componentDidMount() { // method called once all elements on the page are rendered
        setTimeout( () => { this.setState({ acknowledge: false }) }, 3000)
    }

    threeDayFunction() { //method called once first acknowledgement exits screen
        isLongerThanThreeDays(res => {
            this.setState({ LongerThanThree: res, acknowledge: false })
        })
    }

    isLongerCompleted(event) {
        this.setState({isLongerCompleted: true, LongerThanThree: false })
        console.log(this.state.isLongerCompleted)
    }

    updateCounter(type){
        var count = this.state.counter;
        console.log('type', type)
        console.log('count', count)
        // type=="increment"? count++: count — ;
        // this.setState({counter: count});
        }
        

    render() {
        let longerAndReason = this.state.LongerThanThree ? <HowLongHaveYouFeltLikeThis buttonClick={this.isLongerCompleted.bind(this)} /> : <ReasonForFeelings onClick={this.updateCounter}/>
        return (        
            <div className='background-box'>
                <AnimationsCombined />
                <div className='info-box'>   
                    <CSSTransition in={this.state.acknowledge} timeout={3000} classNames="fade" unmountOnExit appear onExited={() => this.threeDayFunction()}>
                            <LowAcknowledgement />
                    </CSSTransition>
                    <CSSTransition in={this.state.LongerThanThree} timeout={2000} classNames="fade" mountOnEnter>
                            { longerAndReason }
                    </CSSTransition>             
                </div>
            </div>
        );
    }
}

export default MediumLowRoute;