import React from 'react';
import { CSSTransition } from "react-transition-group";
import { TextWithNext, AnimationsLayered } from '../SharedComponents/SharedComponents'
import { AddAnchor } from '../../components/SharedComponents/MentalHealthQuestions'
import '../../styles/animation.css';
const data = require('../../data/data.json');
const fadeTime = 3000;

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

    // called on exit of plant explanation, triggers environment explanation
    showEnvironment() {
        this.setState({ environment: true })
    }
    
    // called when next button clicked after plant explanation
    endEnvironment() {
        this.setState({ environment: false })
    }

    // called on exit of environment explanation, triggers seed explanation
    showSeed() {
        this.setState({ seed: true })
    }
        
        // called when next button clicked after seed explanation
    endSeed() {
        this.setState({ seed: false })
    }

    // called on exit of seed explanation, triggers roots adding
    showRoot() {
        this.setState({ root: true })
    }
        
    // called when next button clicked after roots adding
    endRoot() {
        this.setState({ root: false })
    }

    // called on exit after roots, triggers seed getting dropped into water animation
    showDropped() {
        this.setState({ dropped: true })
    }

    triggerTimeout() {
        setTimeout(() => { this.setState({ dropped: false }) }, 3000)
    }

    showFeeling() {
        this.setState({ feeling: true })
    }

    endFeeling() {
        this.setState({ feeling: false })
    }

    // navigates away to start the choose weather symbol path
    goToChooseWeather() {
        this.props.history.push('/landing');
    }

    render() {
        return (
            <div>
                    <CSSTransition in={this.state.intro} timeout={fadeTime} classNames="fade" unmountOnExit appear onExited={() => { this.showBestPerson() }}><div className='info-box'><TextWithNext text={data[9].onboarding.intro} onClick={this.endIntro.bind(this)} /></div></CSSTransition>
                    <CSSTransition in={this.state.bestPerson} timeout={fadeTime} classNames="fade" unmountOnExit onExited={() => { this.showCare() }}><div className='info-box'><TextWithNext text={data[9].onboarding.bestPerson} onClick={this.endBestPerson.bind(this)} /></div></CSSTransition>
                    <CSSTransition in={this.state.careText} timeout={fadeTime} classNames="fade" unmountOnExit onExited={() => { this.showRiver() }}><div className='info-box'><TextWithNext text={data[9].onboarding.care} onClick={this.endCareText.bind(this)} /></div></CSSTransition>
                    <CSSTransition in={this.state.river} timeout={fadeTime} classNames="fade" unmountOnExit onExited={() => { this.showPlant() }}><div className='background-box'><AnimationsLayered animations={['waves']} /><div className='info-box'><TextWithNext text={data[9].onboarding.river} onClick={this.endRiver.bind(this)} /></div></div></CSSTransition>
                    <CSSTransition in={this.state.plant} timeout={fadeTime} classNames="fade" unmountOnExit onExited={() => { this.showEnvironment() }}><div className='background-box'><AnimationsLayered animations={['waves', 'plant']} /><div className='info-box'><TextWithNext text={data[9].onboarding.plant} onClick={this.endPlant.bind(this)} /></div></div></CSSTransition>
                    <CSSTransition in={this.state.environment} timeout={fadeTime} classNames="fade" unmountOnExit onExited={() => { this.showSeed() }}><div className='background-box'><AnimationsLayered animations={['waves', 'plant', 'environment']} /><div className='info-box'><TextWithNext text={data[9].onboarding.environment} onClick={this.endEnvironment.bind(this)} /></div></div></CSSTransition>
                    <CSSTransition in={this.state.seed} timeout={fadeTime} classNames="fade" unmountOnExit onExited={() => { this.showRoot() }}><div className='background-box'><AnimationsLayered animations={['growing']} /><div className='info-box'><TextWithNext text={data[9].onboarding.seed} onClick={this.endSeed.bind(this)} /></div></div></CSSTransition>
                    <CSSTransition in={this.state.root} timeout={fadeTime} classNames="fade" unmountOnExit onExited={() => { this.showDropped() }}><div className='background-box'><AnimationsLayered animations={['growing']} /><div className='info-box'><h1>{data[9].onboarding.roots}</h1><AddAnchor buttonClick={this.endRoot.bind(this)}/></div></div></CSSTransition>
                    <CSSTransition in={this.state.dropped} timeout={fadeTime} classNames="fade" unmountOnExit onEnter={() => { this.triggerTimeout() }} onExited={() => { this.showFeeling() }}><div className='background-box'><AnimationsLayered animations={['waves','growing']} /></div></CSSTransition>
                    <CSSTransition in={this.state.feeling} timeout={fadeTime} classNames="fade" unmountOnExit onExited={() => { this.goToChooseWeather() }}><div className='background-box'><AnimationsLayered animations={['waves','plant','environment']} /><div className='info-box'><TextWithNext text={data[9].onboarding.feeling} onClick={this.endFeeling.bind(this)} /></div></div></CSSTransition>

        </div>
        );
    }
}

export default Onboarding;
