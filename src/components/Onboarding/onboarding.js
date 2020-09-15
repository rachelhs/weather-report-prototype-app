import React from 'react';
import { CSSTransition } from "react-transition-group";
import BackgroundAnimation from '../Animations/BackgroundAnimation'
import ForegroundAnimation from '../Animations/ForegroundAnimation'
import { TextWithNext, AnimationsLayered } from '../SharedComponents/SharedComponents'
import '../../styles/animation.css';
const data = require('../../data/data.json');
const fadeTime = 200;

//text={data[9].onboarding.intro}

export class Onboarding extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            intro: true
        }
    }

    // called when next button clicked after intro
    endIntro() {
        this.setState({ intro: false })
    }

    // called on exit of intro, triggers best person text
    showBestPerson() {
        this.setState({ bestPerson: true })
    }

    // called when next button clicked after best person text
    endBestPerson() {
        this.setState({ bestPerson: false })
    }

    // called on exit of best person, triggers care text
    showCare() {
        this.setState({ careText: true })
    }

    // called when next button clicked after care text
    endCareText() {
        this.setState({ careText: false })
    }

    // called on exit of care text, triggers river explanation
    showRiver() {
        this.setState({ river: true })
    }

    // called when next button clicked after river explanation
    endRiver() {
        this.setState({ river: false })
    }

    // called on exit of river explanation, triggers plant explanation
    showPlant() {
        this.setState({ plant: true })
    }
    
    // called when next button clicked after plant explanation
    endPlant() {
        this.setState({ plant: false })
    }

    render() {
        return (
            <div>
                    <CSSTransition in={this.state.intro} timeout={fadeTime} classNames="fade" unmountOnExit appear onExited={() => { this.showBestPerson() }}><div className='info-box'><TextWithNext text={data[9].onboarding.intro} onClick={this.endIntro.bind(this)} /></div></CSSTransition>
                    <CSSTransition in={this.state.bestPerson} timeout={fadeTime} classNames="fade" unmountOnExit onExited={() => { this.showCare() }}><div className='info-box'><TextWithNext text={data[9].onboarding.bestPerson} onClick={this.endBestPerson.bind(this)} /></div></CSSTransition>
                    <CSSTransition in={this.state.careText} timeout={fadeTime} classNames="fade" unmountOnExit onExited={() => { this.showRiver() }}><div className='info-box'><TextWithNext text={data[9].onboarding.care} onClick={this.endCareText.bind(this)} /></div></CSSTransition>
                    <CSSTransition in={this.state.river} timeout={fadeTime} classNames="fade" unmountOnExit onExited={() => { this.showPlant() }}><div className='background-box'><AnimationsLayered animations={['waves']} /><div className='info-box'><TextWithNext text={data[9].onboarding.river} onClick={this.endRiver.bind(this)} /></div></div></CSSTransition>
                    <CSSTransition in={this.state.plant} timeout={fadeTime} classNames="fade" unmountOnExit onExited={() => { this.showCare() }}><div className='background-box'><AnimationsLayered animations={['waves', 'sun']} /><div className='info-box'><TextWithNext text={data[9].onboarding.plant} onClick={this.endPlant.bind(this)} /></div></div></CSSTransition>

            </div>
        );
    }
}

export default Onboarding;
