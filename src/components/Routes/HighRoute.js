import React from 'react';
import { AnimationsLayered, ReasonForFeelings, ReasonForFeelingsInput, FeedbackStatement, SetReminder, TakePhoto, ReactFirebaseFileUpload } from '../SharedComponents/SharedComponents';
import { LikeAboutYourselfQuestion, EnjoyQuestion } from '../SharedComponents/MentalHealthQuestions';
import { randomQuestionNumber } from '../../actions/route-functions';
import { CSSTransition } from "react-transition-group";
import '../../styles/animation.css';
const data = require('../../data/data.json');

class HighRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            route: 'high',
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
            highFadeIn: false,
            whiteBackground: false,
            animationSpeed: 1
        }
    }

    // method called as soon as all elements on the page are rendered & changed showAcknowledge to false after 3 seconds. This will hide the statement.
    componentDidMount() {
        this.setState({ randQues: randomQuestionNumber(2) });

        setTimeout(() => { this.setState({ neutralAnimation: false, okFadeIn: true }) }, 500)
        setTimeout(() => {
            setInterval(() => {
                if (this.state.animationSpeed <= 1 && this.state.animationSpeed >= 0.1)
                    this.setState({ animationSpeed: this.round((this.state.animationSpeed - 0.1), 1) })
            }, 100)
        }, 5000)
        setTimeout(() => { this.setState({ whiteBackground: true }) }, 5500)
        setTimeout(() => { this.setState({ showReasonForFeeling: true }) }, 7500)
    }

    round(value, precision) {
        let multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    answeredReasonKnown(reasonKnown) { reasonKnown ? this.setState({ knowReasonForFeeling: true, showReasonForFeeling: false }) : this.setState({ knowReasonForFeeling: false, showReasonForFeeling: false }) }

    afterReasonForFeeling() { this.state.knowReasonForFeeling ? this.setState({ showReasonInput: true }) : this.setState({ showRandQues: true }) }

    answeredReasonInput() { this.setState({ showReasonInput: false }) }

    answeredRandomQuestion() { this.setState({ showRandQues: false }) }

    showFeedbackStatement() { this.setState({ showFeedbackStatement: true }) }

    showSetReminder() { this.setState({ showSetReminderQuestion: true }) }

    answeredSetReminder(yes) { yes ? this.setState({ showSetReminderQuestion: false, takePhoto: true }) : this.setState({ showSetReminderQuestion: false }) }

    feedbackOrTakePhotoQuestion() { this.state.takePhoto ? this.setState({ showTakePhoto: true }) : this.setState({ showFeedbackStatement: true }) }

    answeredPhotoAsk(yes) { yes ? this.setState({ takePhotoYes: true, showTakePhoto: false }) : this.setState({ showTakePhoto: false }) }

    photoOrFeedback() { this.state.takePhotoYes ? this.setState({ uploadPhoto: true }) : this.setState({ showFeedbackStatement: true }) }

    uploadedPhoto() { this.setState({ uploadPhoto: false }) }

    render() {
        const randomQuestion = this.state.randQues == 0 ? <LikeAboutYourselfQuestion buttonClick={this.answeredRandomQuestion.bind(this)} /> : <EnjoyQuestion buttonClick={this.answeredRandomQuestion.bind(this)} />;

        return (
            <div>
                <CSSTransition in={this.state.neutralAnimation} timeout={4000} classNames="fade-enter-only" unmountOnExit>
                    <AnimationsLayered speeds={[1]} animations={['neutralBackground']} />
                </CSSTransition>
                <CSSTransition in={this.state.highFadeIn} timeout={4000} classNames="fade-enter-only">
                    <AnimationsLayered speeds={[this.state.animationSpeed]} animations={['highFadeIn']} />
                </CSSTransition>
                <CSSTransition in={this.state.whiteBackground} timeout={2000} classNames="fade" unmountOnExit>
                    <div className='background-box'></div>
                </CSSTransition>
                <div className='info-box'>
                    <CSSTransition in={this.state.showReasonForFeeling} timeout={2000} classNames="fade" appear unmountOnExit onExited={() => this.afterReasonForFeeling()}><ReasonForFeelings onClick={this.answeredReasonKnown.bind(this)} /></CSSTransition>
                    {/* if user ansers 'no' to reason for feeling */}
                    <CSSTransition in={this.state.showRandQues} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showFeedbackStatement()}>{randomQuestion}</CSSTransition>
                    {/* if user ansers 'yes' to reason for feeling */}
                    <CSSTransition in={this.state.showReasonInput} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showSetReminder()}><ReasonForFeelingsInput buttonClick={this.answeredReasonInput.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showSetReminderQuestion} timeout={2000} className="fade" unmountOnExit onExited={() => this.feedbackOrTakePhotoQuestion()} ><SetReminder onClick={this.answeredSetReminder.bind(this)} /></CSSTransition>
                    {/* if user ansers 'yes' to record memory */}
                    <CSSTransition in={this.state.showTakePhoto} timeout={2000} className="fade" unmountOnExit onExited={() => this.photoOrFeedback()} ><TakePhoto onClick={this.answeredPhotoAsk.bind(this)} /></CSSTransition>
                    {/* if user ansers 'yes' to upload photo */}
                    <CSSTransition in={this.state.uploadPhoto} timeout={2000} classNames="fade" appear unmountOnExit unmountOnExit onExited={() => this.showFeedbackStatement()}><ReactFirebaseFileUpload onClick={this.uploadedPhoto.bind(this)} /></CSSTransition>
                    {/* show feedback statement */}
                    <CSSTransition in={this.state.showFeedbackStatement} timeout={2000} className="fade" unmountOnExit><FeedbackStatement dataFromParent={this.state.route}/></CSSTransition>
                </div>
            </div>
        );
    }
}

export default HighRoute;