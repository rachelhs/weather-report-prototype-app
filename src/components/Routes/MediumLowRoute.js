import React from 'react';
import { LowAcknowledgement, AnimationsCombined, FadeOut, FadeIn, HowLongHaveYouFeltLikeThis } from '../SharedComponents/SharedComponents';
import { isLongerThanThreeDays } from '../../actions/route-functions';
import { CSSTransition } from "react-transition-group";
import './animation.css';
import cx from 'classnames';

class MediumLowRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            acknowledge: true,
            LongerThanThree: false
        }
      }

    componentDidMount() {
        setTimeout( () => { 
            isLongerThanThreeDays(res => {
                this.setState({
                    acknowledge: false,
                    LongerThanThree: res
                })
                console.log('isLongerThanThreeDays result', res)
            })
        }, 3000)
    }


    render() {
        console.log('longer than three', this.state.LongerThanThree)
        return (
            <div className='background-box'>
                <AnimationsCombined />
                <div className='info-box'>   
                    <CSSTransition in={this.state.acknowledge} timeout={2000} classNames="fade" unmountOnExit appear>
                            <LowAcknowledgement />
                    </CSSTransition>
                    <CSSTransition in={this.state.LongerThanThree} timeout={2000} classNames="fade" unmountOnExit appear>
                            <HowLongHaveYouFeltLikeThis />
                    </CSSTransition>              

                </div>
            </div>
        );
    }
}

export default MediumLowRoute;