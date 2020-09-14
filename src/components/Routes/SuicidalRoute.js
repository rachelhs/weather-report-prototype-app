import React from 'react';
import { AnimationsCombined, SuicidalAcknowledgement, HowLongHaveYouFeltLikeThis, RiskOfHarm, PlanQ, PlanningQ, FeelingsPassStatement, Samaritans, AllRootsWithNext, FeedbackStatement, Crisis } from '../SharedComponents/SharedComponents';
import { isLongerThanThreeDays, expressedSuicidalRecently } from '../../actions/route-functions';
import { SpokenToQ, GettingHelpQ } from '../SharedComponents/MentalHealthQuestions';
import { CSSTransition } from "react-transition-group";
import '../../styles/animation.css';

class SuicidalRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            route: 'suicidal',
            acknowledge: null,
            howLong: null,
            areYouAtRisk: null,
            harm: null
        }
        this.showAcknowledge = this.showAcknowledge.bind(this);
        this.actionAfterHarm = this.actionAfterHarm.bind(this);
        this.actionAfterPlanning = this.actionAfterPlanning.bind(this);
    }

    // method called as soon as all elements on the page are rendered & changed showAcknowledge to false after 3 seconds. This will hide the statement.
    componentDidMount() {

        setTimeout(() => { this.setState({ acknowledge: false }) }, 3000)

        expressedSuicidalRecently(res => {
            res ? this.setState({ acknowledge: true }) : this.setState({ acknowledge: false })
        })
        this.threeDayFunction()
    }

    // called onexit of showAcknowledge
    threeDayFunction() {
        isLongerThanThreeDays(res => {
            res ? this.setState({ howLong: true }) : this.setState({ howLong: false, acknowledge: true })
        })
    }

    showAcknowledge() {
        this.setState({ acknowledge: true })
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
        setTimeout(() => { this.setState({ acknowledge: false }) }, 3000)
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
            this.setState({ showFeedback: true })
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

    render() {
        return (
            <div className='background-box'>
                <AnimationsCombined />
                <div className='info-box'>
                    <CSSTransition in={this.state.howLong} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.showAcknowledge() }}><HowLongHaveYouFeltLikeThis buttonClick={this.answeredHowLong.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.acknowledge} timeout={2000} onEnter={() => { this.triggerTimeout() }} unmountOnExit classNames="fade" onExited={() => this.areYouAtRisk()}><SuicidalAcknowledgement /></CSSTransition>
                    <CSSTransition in={this.state.areYouAtRisk} timeout={2000} onExited={() => { this.triggerAfterHarm() }} classNames="fade" unmountOnExit><RiskOfHarm onClick={this.actionAfterHarm.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showPlanQ} timeout={2000} onExited={() => { this.triggerAfterPlan() }} classNames="fade" unmountOnExit><PlanQ onClick={this.actionAfterPlan.bind(this)}/></CSSTransition>
                    <CSSTransition in={this.state.showPlanningQ} timeout={2000} onExited={() => { this.triggerAfterPlanning() }} classNames="fade" unmountOnExit><PlanningQ onClick={this.actionAfterPlanning.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showFeelingsPass} timeout={2000} onEnter={() => { this.triggerTimeout() }} onExited={() => { this.showCrisisTeam() }} classNames="fade" unmountOnExit><FeelingsPassStatement /></CSSTransition>
                    <CSSTransition in={this.state.showSamaritans} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.showAnchors() }}><Samaritans onClick={this.actionAfterSamaritans.bind(this)}/></CSSTransition>

                    <CSSTransition in={this.state.showCrisisTeam} timeout={2000} classNames="fade" unmountOnExit onExited={() => {this.showSamaritans()}}><Crisis onClick={this.leaveCrisis.bind(this)} /></CSSTransition>

                    <CSSTransition in={this.state.showAnchors} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.showGettingHelp() }}><AllRootsWithNext onClick={this.leaveAnchors.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showGettingHelp} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.actionAfterHelpQ() }}><GettingHelpQ onClick={this.leaveGettingHelpQ.bind(this)}/></CSSTransition>

                    <CSSTransition in={this.state.haveSpokenQ} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.actionAfterSpokenTo() }}><SpokenToQ onClick={this.processSpokenToQ.bind(this)}/></CSSTransition>
                    <CSSTransition in={this.state.showFeedback} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.goHome()}><FeedbackStatement dataFromParent = {this.state.route} onClick={this.clickedHome.bind(this)} /></CSSTransition>

                </div>
            </div>
        );
    }
}



export default SuicidalRoute;