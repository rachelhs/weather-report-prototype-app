import React from 'react';
import { AnimationsLayered, ReasonForFeelings, ReasonForFeelingsInput, FeedbackStatement, SetReminder, TakePhoto, ReactFirebaseFileUpload } from '../SharedComponents/SharedComponents';
import { GratefulQuestion, TakeCareQuestion } from '../SharedComponents/MentalHealthQuestions';
import { randomQuestionNumber  } from '../../actions/route-functions';
import { CSSTransition } from "react-transition-group";
import '../../styles/animation.css';
const data = require('../../data/data.json');

class OkRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            route: 'ok',
            showReasonForFeeling: false,
            knowReasonForFeeling: null,
            randQues: null,
            showRandQues: null,
            showSetReminderQuestion: null,
            takePhoto: null,
            showTakePhoto: null, 
            showFeedbackStatement: null, 
            uploadPhoto: null,
            neutralAnimation: true, 
            okFadeIn: false,
            okBackground: false
        }
      }

    // method called as soon as all elements on the page are rendered & changed showAcknowledge to false after 3 seconds. This will hide the statement.
    componentDidMount() { 
        this.setState({ randQues: randomQuestionNumber(2) });
        setTimeout(() => { this.setState({ neutralAnimation: false, okFadeIn: true })}, 5000)
    }

    showBackground() { this.setState({ okFadeIn: false }) }

    answeredReasonKnown(reasonKnown){ reasonKnown ? this.setState({ knowReasonForFeeling: true, showReasonForFeeling: false }) : this.setState({ knowReasonForFeeling: false, showReasonForFeeling: false }) }
    
    afterReasonForFeeling() { this.state.knowReasonForFeeling ? this.setState({ showReasonInput: true}) : this.setState({ showRandQues: true }) }
    
    answeredReasonInput() { this.setState({ showReasonInput: false }) }

    answeredRandomQuestion() { this.setState({ showRandQues: false }) }

    showFeedbackStatement() { this.setState({ showFeedbackStatement: true }) }

    showSetReminder() { this.setState({ showSetReminderQuestion: true })}

    answeredSetReminder(yes) { yes ? this.setState({ showSetReminderQuestion: false, takePhoto: true }) : this.setState({ showSetReminderQuestion: false })}

    feedbackOrTakePhotoQuestion() { this.state.takePhoto ? this.setState({ showTakePhoto: true }) : this.setState({ showFeedbackStatement: true }) }

    answeredPhotoAsk(yes) { yes ? this.setState({ takePhotoYes: true, showTakePhoto: false }) : this.setState({ showTakePhoto: false })}

    photoOrFeedback() { this.state.takePhotoYes ? this.setState({ uploadPhoto: true }): this.setState({ showFeedbackStatement: true })}

    uploadedPhoto() { this.setState({ uploadPhoto: false }) }

    clickedHome() { this.setState({ showFeedbackStatement: false }) }

    goHome() { this.props.history.push('/home') }

    render() {
        console.log('this.state.neutralAnimation', this.state.neutralAnimation)
        const randomQuestion = this.state.randQues == 0 ? <GratefulQuestion buttonClick={this.answeredRandomQuestion.bind(this)} /> : <TakeCareQuestion buttonClick={this.answeredRandomQuestion.bind(this)} />;
            return (        
            // <div className='background-box'>
            <div>
                
                {/* {this.state.neutralAnimation ? 
                <AnimationsLayered speeds={[0.5]} animations={['neutralBackground']} />
                 : 
                <AnimationsLayered speeds={[0.5]} animations={['okFadeIn']} /> } */}
                {/* <CSSTransition in={this.state.neutralAnimation} timeout={4000} classNames="fade-enter-only" unmountOnExit>
                    <AnimationsLayered speeds={[0.5]} animations={['neutralBackground']} />
                </CSSTransition>  
                <CSSTransition in={this.state.okFadeIn} timeout={4000} classNames="fade-enter-only">
                    <AnimationsLayered speeds={[0.5]} animations={['okFadeIn']} />
                </CSSTransition> */}

                {this.state.neutralAnimation ?
                <AnimationsLayered speeds={[0.5]} animations={['okFadeIn']} />
                :
                <div className='background-box fade-in'>
                <AnimationsLayered speeds={[0]} animations={['okBackground']} />
                </div>
                }

            
                <div className='info-box'>   
                    <CSSTransition in={this.state.showReasonForFeeling} timeout={2000} classNames="fade" appear unmountOnExit onExited={() => this.afterReasonForFeeling()}><ReasonForFeelings onClick={this.answeredReasonKnown.bind(this)} /></CSSTransition>
                    {/* if user ansers 'no' to reason for feeling */}
                    <CSSTransition in={this.state.showRandQues} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showFeedbackStatement()}>{ randomQuestion }</CSSTransition>
                    {/* if user ansers 'yes' to reason for feeling */}
                    <CSSTransition in={this.state.showReasonInput} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showSetReminder()}><ReasonForFeelingsInput buttonClick={this.answeredReasonInput.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showSetReminderQuestion} timeout={2000} className="fade" unmountOnExit onExited={() => this.feedbackOrTakePhotoQuestion()} ><SetReminder onClick={this.answeredSetReminder.bind(this)} /></CSSTransition>
                    {/* if user ansers 'yes' to record memory */}
                    <CSSTransition in={this.state.showTakePhoto} timeout={2000} className="fade" unmountOnExit onExited={() => this.photoOrFeedback()} ><TakePhoto onClick={this.answeredPhotoAsk.bind(this)}/></CSSTransition>
                    {/* if user ansers 'yes' to upload photo */}
                    <CSSTransition in={this.state.uploadPhoto} timeout={2000} classNames="fade" appear unmountOnExit unmountOnExit onExited={() => this.showFeedbackStatement()}><ReactFirebaseFileUpload onClick={this.uploadedPhoto.bind(this)} /></CSSTransition>
                    {/* show feedback statement */}
                    <CSSTransition in={this.state.showFeedbackStatement} timeout={2000} className="fade" unmountOnExit onExited={() => this.goHome()}><FeedbackStatement dataFromParent = {this.state.route} onClick={this.clickedHome.bind(this)} /></CSSTransition>
                </div>
            </div>
        );
    }
}

export default OkRoute;