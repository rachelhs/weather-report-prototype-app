import React from 'react';
import { HowLongHaveYouFeltLikeThis, RiskOfHarmTooHigh, PlanQ, PlanningQ, FeelingsPassStatement, Samaritans, AllRootsWithNext, Crisis, ReasonForFeelings, ReasonForFeelingsInput, FeedbackStatement } from '../SharedComponents/SharedComponents';
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
            firstAnimation: true,
            neutralAnimation: true,
            tooHighFadeIn: false,
            whiteBackground: false,
            animationSpeed: 1,
            weatherSymbol: null, 
            weatherFadeIn: null
        }
        this.actionAfterHarm = this.actionAfterHarm.bind(this);
        this.actionAfterPlanning = this.actionAfterPlanning.bind(this);
    }

    componentDidMount() {
        if (typeof this.props.location.state != 'undefined' || this.props.location.state != null) {
            let weatherFadeIn = this.props.location.state.weatherSymbol + "FadeIn"
            this.setState({ weatherFadeIn: weatherFadeIn });
            this.setState({ weatherSymbol: this.props.location.state.weatherSymbol });
            console.log('props', this.props.location.state.weatherSymbol)
        } else {
            this.setState({ weatherFadeIn: "neutralBackground" });
        }
        setTimeout(() => { this.setState({ neutralAnimation: false, tooHighFadeIn: true }) }, 500)
        setTimeout(() => {
            setInterval(() => {
                if (this.state.animationSpeed <= 1 && this.state.animationSpeed >= 0.1)
                    this.setState({ animationSpeed: this.round((this.state.animationSpeed - 0.1), 1) })
            }, 100)
        }, 5000)
        setTimeout(() => { this.setState({ whiteBackground: true }) }, 5500)

        expressedTooHighRecently(res => {
            res ? this.setState({ expressedRecently: true }) : this.setState({ expressedRecently: false })
            console.log('expressed recently', this.state.expressedRecently);
        })
        this.threeDayFunction()
        // setting exercise
        let randomExercise = ChooseExercise(['breathing', 'grounding', 'lessStimulation', 'safePlace', 'anchors']);
        this.setState({ randExercise: randomExercise });
        setTimeout(() => { this.decideStart() }, 7500)
    }

    round(value, precision) {
        let multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
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
        else if (this.state.expressedRecently == false && this.state.longerThanThreeDays == true) {
            this.setState({ awareOf: true })
            console.log('two')

        }
        else if (this.state.longerThanThreeDays == false) {
            this.setState({ howLong: true })
            console.log('three')

        };
    }

    answeredHowLong() {
        this.setState({ howLong: false })
    }

    areYouAtRisk() {
        this.setState({ areYouAtRisk: true })
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
            this.setState({ showGettingHelp: true })
        }
        else if (this.state.help) {
            this.setState({ showAnchors: true })
        }
    }

    processReasonFor(res) {
        res ? this.setState({ awareOf: false, reason: true }) : this.setState({ awareOf: false, exercise: true })
    }

    actionAfterReason() {
        if (this.state.reason) {
            this.setState({ showNote: true })
        }
        else if (this.state.exercise) {
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

    render() {
        return (
            <div>
                <CSSTransition in={this.state.neutralAnimation} timeout={4000} classNames="fade-enter-only" unmountOnExit>
                    <AnimationsLayered speeds={[1]} animations={['neutralBackground']} />
                </CSSTransition>
                <CSSTransition in={this.state.tooHighFadeIn} timeout={4000} classNames="fade-enter-only">
                    <AnimationsLayered speeds={[this.state.animationSpeed]} animations={[this.state.weatherFadeIn]} />
                </CSSTransition>
                <CSSTransition in={this.state.whiteBackground} timeout={2000} classNames="fade" unmountOnExit>
                    <div className='background-box'></div>
                </CSSTransition>
                <div className='center-vertical-higher'>
                    <div className='info-box-landing'>
                        <CSSTransition in={this.state.howLong} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.areYouAtRisk() }}><HowLongHaveYouFeltLikeThis buttonClick={this.answeredHowLong.bind(this)} /></CSSTransition>
                        <CSSTransition in={this.state.areYouAtRisk} timeout={2000} onExited={() => { this.triggerAfterHarm() }} classNames="fade" unmountOnExit><RiskOfHarmTooHigh onClick={this.actionAfterHarm.bind(this)} /></CSSTransition>
                        <CSSTransition in={this.state.showPlanQ} timeout={2000} onExited={() => { this.triggerAfterPlan() }} classNames="fade" unmountOnExit><PlanQ onClick={this.actionAfterPlan.bind(this)} /></CSSTransition>
                        <CSSTransition in={this.state.showPlanningQ} timeout={2000} onExited={() => { this.triggerAfterPlanning() }} classNames="fade" unmountOnExit><PlanningQ onClick={this.actionAfterPlanning.bind(this)} /></CSSTransition>
                        <CSSTransition in={this.state.showFeelingsPass} timeout={2000} onEnter={() => { this.triggerTimeout() }} onExited={() => { this.showCrisisTeam() }} classNames="fade" unmountOnExit><FeelingsPassStatement /></CSSTransition>
                        <CSSTransition in={this.state.showSamaritans} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.showAnchors() }}><Samaritans onClick={this.actionAfterSamaritans.bind(this)} /></CSSTransition>
                        <CSSTransition in={this.state.showCrisisTeam} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.showSamaritans() }}><Crisis onClick={this.leaveCrisis.bind(this)} /></CSSTransition>
                        <CSSTransition in={this.state.showAnchors} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.showGettingHelp() }}><AllRootsWithNext onClick={this.leaveAnchors.bind(this)} /></CSSTransition>
                        <CSSTransition in={this.state.showGettingHelp} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.actionAfterHelpQ() }}><GettingHelpQ onClick={this.leaveGettingHelpQ.bind(this)} /></CSSTransition>
                        <CSSTransition in={this.state.haveSpokenQ} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.actionAfterSpokenTo() }}><SpokenToQ onClick={this.processSpokenToQ.bind(this)} /></CSSTransition>
                        <CSSTransition in={this.state.awareOf} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.actionAfterReason() }}><ReasonForFeelings onClick={this.processReasonFor.bind(this)} /></CSSTransition>
                        <CSSTransition in={this.state.showNote} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.actionAfterNote() }}><ReasonForFeelingsInput buttonClick={this.processNote.bind(this)} /></CSSTransition>
                        <CSSTransition in={this.state.exercises} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.actionAfterExercises() }}><div className='flex-center'><div>{SetExercises(this.state.randExercise)}</div><button className='next-button' onClick={this.seenExercise.bind(this)}>next</button></div></CSSTransition>
                        <CSSTransition in={this.state.showFeedbackStatement} timeout={2000} className="fade" unmountOnExit><FeedbackStatement route={this.state.route} weather={this.state.weatherSymbol}/></CSSTransition>
                    </div>
                </div>
            </div>
        );
    }
}



export default TooHighRoute;