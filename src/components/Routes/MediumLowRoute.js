import React from 'react';
import { LowAcknowledgement, AnimationsCombined, HowLongHaveYouFeltLikeThis, ReasonForFeelings, ReasonForFeelingsInput } from '../SharedComponents/SharedComponents';
import { isLongerThanThreeDays } from '../../actions/route-functions';
import { CSSTransition } from "react-transition-group";
import '../../styles/animation.css';

class MediumLowRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAcknowledge: true,
            showHowLong: null,
            showReasonForFeeling: null,
            showRandomQuestions: null,
            knowReasonForFeeling: null,
        }
      }

    // method called as soon as all elements on the page are rendered & changed showAcknowledge to false after 3 seconds. This will hide the statement.
    componentDidMount() { 
        setTimeout( () => { this.setState({ showAcknowledge: false }) }, 3000)
    }

    // called onexit of showAcknowledge
    threeDayFunction() { 
        isLongerThanThreeDays(res => {
            res ? this.setState({ showHowLong: true, showAcknowledge: false }) : this.setState({ showReasonForFeeling: true, showAcknowledge: false })
        })
    }

    // called from button click on the how long have you been feeling this way component. This then hides the div.
    answeredHowLong() { this.setState({ showHowLong: false }) }
    
    //called onexit of HowLongHaveYouFeltLikeThis component - trigged from state changing to false in answeredHowLong()
    showReasonForFeeling() { this.setState({ showReasonForFeeling: true }) }

    // called from button click on the do you know why you feel like this div. This sets state for whether user knows why they feel the way they do & either way, will hide the div
    answeredReasonKnown(reasonKnown){ reasonKnown ? this.setState({ knowReasonForFeeling: true, showReasonForFeeling: false }) : this.setState({ knowReasonForFeeling: false, showReasonForFeeling: false }) }
    
    // called onexit from ReasonForFeelings component, trigged from answeredReasonKnown() function above. This function will either show the input box or go onto the random questions section
    afterReasonForFeeling() { this.state.knowReasonForFeeling ? this.setState({ showReasonInput: true}) : this.setState({ showRandomQuestions: true }) }
    
    // called when user pressed submit on the answered reason input, This will hide the div
    answeredReasonInput() { this.setState({ showReasonInput: false, showRandomQuestions: true }) }
    
    render() {
        return (        
            <div className='background-box'>
                <AnimationsCombined />
                <div className='info-box'>   
                    <CSSTransition in={this.state.showAcknowledge} timeout={3000} classNames="fade" unmountOnExit appear onExited={() => this.threeDayFunction()}><LowAcknowledgement /></CSSTransition>
                    <CSSTransition in={this.state.showHowLong} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showReasonForFeeling()}><HowLongHaveYouFeltLikeThis buttonClick={this.answeredHowLong.bind(this)}/></CSSTransition>
                    <CSSTransition in={this.state.showReasonForFeeling} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.afterReasonForFeeling()}><ReasonForFeelings onClick={this.answeredReasonKnown.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showReasonInput} timeout={2000} classNames="fade" unmountOnExit><ReasonForFeelingsInput buttonClick={this.answeredReasonInput.bind(this)} /></CSSTransition>
                </div>
            </div>
        );
    }
}

export default MediumLowRoute;