import React from 'react';
import { AnimationsCombined, HowLongHaveYouFeltLikeThis, RiskOfHarm, PlanQ, PlanningQ, FeelingsPassStatement, Samaritans, AllRootsWithNext, Crisis, ReasonForFeelings, ReasonForFeelingsInput, FeedbackStatement } from '../SharedComponents/SharedComponents';
import { SpokenToQ, GettingHelpQ } from '../SharedComponents/MentalHealthQuestions'
import { isLongerThanThreeDays, expressedTooHighRecently } from '../../actions/route-functions';
import { CSSTransition } from "react-transition-group";
import { SetExercises } from '../Exercises/SetExercises';
import { ChooseExercise } from '../Exercises/ChooseExercise';
import { AnimationsLayered } from '../SharedComponents/SharedComponents'

import '../../styles/animation.css';

class TooHighRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            howLong: false,
            areYouAtRisk: null,
            harm: null,
            randExercise: null,
            route: 'tooHigh',
            firstAnimation: true
            }
        this.actionAfterHarm = this.actionAfterHarm.bind(this);
        this.actionAfterPlanning = this.actionAfterPlanning.bind(this);
    }

    componentDidMount() {

        // fade in animation plays for three seconds
        setTimeout(() => { this.setState({ firstAnimation: false })}, 3000)

        expressedTooHighRecently(res => {
            res ? this.setState({ expressedRecently: true }) : this.setState({ expressedRecently: false })
            console.log('expressed recently', this.state.expressedRecently);
        })
        this.threeDayFunction()
        // setting exercise
        let randomExercise = ChooseExercise(['breathing', 'grounding', 'lessStimulation', 'safePlace', 'anchors']);
        this.setState({ randExercise: randomExercise });
        setTimeout(() => { this.decideStart() }, 3000)
    }

    threeDayFunction() {
        isLongerThanThreeDays(result => {
            result ? this.setState({ longerThanThreeDays: true }) : (this.setState({ longerThanThreeDays: false }))
            console.log('three days', result);
        })
    }

    decideStart() {
        if (this.state.expressedRecently == true) {
            this.setState({ areYouAtRisk: true })
            console.log('one')
        }
        if (this.state.expressedRecently == false && this.state.longerThanThreeDays == true) {
            this.setState({ awareOf: true })
            console.log('two')

        }
        else if (this.state.longerThanThreeDays == false) {
            this.setState({ howLong: true })
            console.log('three')

        }
    }

    answeredHowLong() {
        this.setState({ howLong: false })
    }

    areYouAtRisk() {
        this.setState({ areYouAtRisk: true })
    }

    // goes to home page
    goHome() {
        this.props.history.push('/home');
    }

    triggerTimeout() {
        setTimeout(() => { this.setState({ showFeelingsPass: false }) }, 3000)
    }

    actionAfterHarm = (res) => {
        res ? this.setState({ harm: true, areYouAtRisk: false }) : this.setState({ harm: false, areYouAtRisk: false })
    }

    triggerAfterHarm() {

        if (this.state.harm) {
            this.setState({ showPlanQ: true })
        }
        else {
            this.setState({ haveSpokenQ: true })
        }
    }

    actionAfterPlan = (res) => {
        res ? this.setState({ planning: true, showPlanQ: false }) : this.setState({ planning: false, showPlanQ: false })
    }

    triggerAfterPlan() {

        if (this.state.planning) {
            this.setState({ showPlanningQ: true })
        }
        else {
            this.setState({ showAnchors: true })
        }
    }

    actionAfterPlanning = (res) => {
        res ? this.setState({ feelingsPass: true, showPlanningQ: false }) : this.setState({ feelingsPass: false, showPlanningQ: false })
    }

    triggerAfterPlanning() {

        if (this.state.feelingsPass) {
            this.setState({ showFeelingsPass: true })
        }
        else {
            this.setState({ showCrisisTeam: true })
        }
    }

    showCrisisTeam() {
        this.setState({ showSamaritans: true })
    }

    actionAfterSamaritans() {
        this.setState({ showSamaritans: false })
    }

    showAnchors() {
        this.setState({ showAnchors: true })
    }

    leaveAnchors() {
        this.setState({ showAnchors: false })
    }

    showGettingHelp() {
        this.setState({ showGettingHelp: true })
    }

    leaveGettingHelpQ(res) {
        res ? this.setState({ showGettingHelp: false, feedback: true }) : this.setState({ showGettingHelp: false, crisis: true })  
    }

    actionAfterHelpQ() {
        if (this.state.feedback) {
            this.setState({ awareOf: true })
        }
        else if (this.state.crisis) {
            this.setState({ showCrisisTeam: true })
        }
    }

    clickedHome() {
        this.setState({ showFeedback: false })
    }

    leaveCrisis() {
        this.setState({ showCrisisTeam: false })
    }

    showSamaritans() {
        this.setState({ showSamaritans: true })
    }

    processSpokenToQ(res) {
        res ? this.setState({ haveSpokenQ: false, spoken: true }) : this.setState({ haveSpokenQ: false, help: true })
    }

    actionAfterSpokenTo() {
        if (this.state.spoken) {
            this.setState({showGettingHelp: true})
        }
        else if(this.state.help) {
            this.setState({showAnchors: true})
        }
    }

    processReasonFor(res) {
        res ? this.setState({ awareOf: false, reason: true }) : this.setState({ awareOf: false, exercise: true })
    }

    actionAfterReason() {
        if (this.state.reason) {
            this.setState({ showNote: true })
        }
        else if (this.state.exercise){
            this.setState({ exercises: true })
        }
    }

    processNote() {
        this.setState({ showNote: false })
    }

    actionAfterNote() {
        this.setState({ exercises: true })
    }

    seenExercise() {
        this.setState({ exercises: false })
    }

    actionAfterExercises() {
        this.setState({ showFeedbackStatement: true })
    }

    // triggered when user clicks to go home
    clickedHome() {
        this.setState({ showFeedbackStatement: false })
    }
    
    // goes to home page
    goHome() {
        this.props.history.push('/home');
    
    }
    render() {
        return (
            <div>
            {this.state.firstAnimation ? <div className='background-box-no-fade'><AnimationsLayered speeds={[1]} animations={['tooHighFadeIn']} /></div> : <div className='background-box'><AnimationsLayered speeds={[0.01]} animations={['tooHighBackground']} /></div>}
            <div className='info-box'>
                <CSSTransition in={this.state.howLong} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.areYouAtRisk() }}><HowLongHaveYouFeltLikeThis buttonClick={this.answeredHowLong.bind(this)} /></CSSTransition>          
                <CSSTransition in={this.state.areYouAtRisk} timeout={2000} onExited={() => { this.triggerAfterHarm() }} classNames="fade" unmountOnExit><RiskOfHarm onClick={this.actionAfterHarm.bind(this)} /></CSSTransition>
                <CSSTransition in={this.state.showPlanQ} timeout={2000} onExited={() => { this.triggerAfterPlan() }} classNames="fade" unmountOnExit><PlanQ onClick={this.actionAfterPlan.bind(this)}/></CSSTransition>
                <CSSTransition in={this.state.showPlanningQ} timeout={2000} onExited={() => { this.triggerAfterPlanning() }} classNames="fade" unmountOnExit><PlanningQ onClick={this.actionAfterPlanning.bind(this)} /></CSSTransition>
                <CSSTransition in={this.state.showFeelingsPass} timeout={2000} onEnter={() => { this.triggerTimeout() }} onExited={() => { this.showCrisisTeam() }} classNames="fade" unmountOnExit><FeelingsPassStatement /></CSSTransition>
                <CSSTransition in={this.state.showSamaritans} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.showAnchors() }}><Samaritans onClick={this.actionAfterSamaritans.bind(this)}/></CSSTransition>
                <CSSTransition in={this.state.showCrisisTeam} timeout={2000} classNames="fade" unmountOnExit onExited={() => {this.showSamaritans()}}><Crisis onClick={this.leaveCrisis.bind(this)} /></CSSTransition>
                <CSSTransition in={this.state.showAnchors} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.showGettingHelp() }}><AllRootsWithNext onClick={this.leaveAnchors.bind(this)} /></CSSTransition>
                <CSSTransition in={this.state.showGettingHelp} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.actionAfterHelpQ() }}><GettingHelpQ onClick={this.leaveGettingHelpQ.bind(this)}/></CSSTransition>
                <CSSTransition in={this.state.haveSpokenQ} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.actionAfterSpokenTo() }}><SpokenToQ onClick={this.processSpokenToQ.bind(this)}/></CSSTransition>                
                <CSSTransition in={this.state.awareOf} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.actionAfterReason() }}><ReasonForFeelings onClick={this.processReasonFor.bind(this)}/></CSSTransition>
                <CSSTransition in={this.state.showNote} timeout={2000} classNames="fade" unmountOnExit onExited={() => {this.actionAfterNote() } }><ReasonForFeelingsInput buttonClick={this.processNote.bind(this)}/></CSSTransition>
                <CSSTransition in={this.state.exercises} timeout={2000} classNames="fade" unmountOnExit onExited={() => {this.actionAfterExercises() }}><div className='info-box-button'><div>{SetExercises(this.state.randExercise)}</div><button className='next-button' onClick={this.seenExercise.bind(this)}>next</button></div></CSSTransition>
                <CSSTransition in={this.state.showFeedbackStatement} timeout={2000} className="fade" unmountOnExit onExited={() => this.goHome()}><FeedbackStatement dataFromParent = {this.state.route} onClick={this.clickedHome.bind(this)} /></CSSTransition>
                </div>
            </div>
        );
    }
}



export default TooHighRoute;