import React from 'react';
import { AnimationsCombined, ReasonForFeelings, ReasonForFeelingsInput, FeedbackStatement, SetReminder, TakePhoto, ReactFirebaseFileUpload } from '../SharedComponents/SharedComponents';
import { LikeAboutYourselfQuestion, EnjoyQuestion } from '../SharedComponents/MentalHealthQuestions';
import { randomQuestionNumber  } from '../../actions/route-functions';
import { CSSTransition } from "react-transition-group";
import '../../styles/animation.css';
const data = require('../../data/data.json');

class HighRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            route: 'high',
            showReasonForFeeling: true,
            knowReasonForFeeling: null,
            randQues: null,
            showRandQues: null,
            showSetReminderQuestion: null,
            takePhoto: null,
            showTakePhoto: null, 
            showFeedbackStatement: null, 
            uploadPhoto: null
        }
      }

    // method called as soon as all elements on the page are rendered & changed showAcknowledge to false after 3 seconds. This will hide the statement.
    componentDidMount() { 
        this.setState({ randQues: randomQuestionNumber(2) });
    }

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
        const randomQuestion = this.state.randQues == 0 ? <LikeAboutYourselfQuestion buttonClick={this.answeredRandomQuestion.bind(this)} /> : <EnjoyQuestion buttonClick={this.answeredRandomQuestion.bind(this)} />;

        return (        
            <div className='background-box'>
                <AnimationsCombined />
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

export default HighRoute;