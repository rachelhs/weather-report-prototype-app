import React from 'react';
import { Acknowledgement, AnimationsLayered, HowLongHaveYouFeltLikeThis, ReasonForFeelings, ReasonForFeelingsInput, AnotherExerciseQuestion, FeedbackStatement } from '../SharedComponents/SharedComponents';
import { PositiveThingQuestion, FriendsLikeQuestion } from '../SharedComponents/MentalHealthQuestions';
import { isLongerThanThreeDays, randomQuestionNumber, chooseAnotherRandomExercise } from '../../actions/route-functions';
import { CSSTransition } from "react-transition-group";
import { ChooseExercise } from '../Exercises/ChooseExercise';

import '../../styles/animation.css';
// import exercises
import { Breathing, Meditating, Grounding, Stretching, SafePlace } from '../Exercises/TextBasedExercises';
import Gratitude from '../Exercises/ReplayGratitude';
import PositiveMemory from '../Exercises/ReplayPosMemories';
import LikeAboutSelf from '../Exercises/ReplayLikeAboutSelf';
import ReplayContent from '../Exercises/ReplayContent';
import ReplayAnchors from '../Exercises/ReplayAnchors';
import ReplayCare from '../Exercises/ReplayCare';
import { ChangeSituation } from '../SharedComponents/MentalHealthQuestions';

const data = require('../../data/data.json');

class Exercises extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            route: 'mediumLow',
            showRandomPositiveStatement: null,
            showRandomExercises: null,
            exercise: '',
            neutralAnimation: true,
            mediumLowFadeIn: false,
            whiteBackground: false,
            animationSpeed: 1,
            weatherFadeIn: null,
            weatherSymbol: null,
            showRandomQuestions: true
        }
        this.showThenFade = this.showThenFade.bind(this);
    }

    // method called as soon as all elements on the page are rendered & changed showAcknowledge to false after 3 seconds. This will hide the statement.
    componentDidMount() {
        if (typeof this.props.location.state != 'undefined' || this.props.location.state != null) {
            let weatherFadeIn = this.props.location.state.weatherSymbol + "FadeIn"
            this.setState({ weatherFadeIn: weatherFadeIn });
            this.setState({ weatherSymbol: this.props.location.state.weatherSymbol });
        } else {
            this.setState({ weatherFadeIn: "neutralBackground" });
        }
        // set timeout to say I’m sorry you are feeling like this
        setTimeout(() => { this.setState({ showAcknowledge: false }) }, 10500)
        // random function for random questions
        this.setState({ randQues: randomQuestionNumber(2) });
        // random function for random positive statements
        const positiveArray = data[4].mediumLow.positiveStatements;
        this.setState({ randPositive: randomQuestionNumber(positiveArray.length) });
        // setting exercise
        let exercise = ChooseExercise(['meditating', 'gratitude', 'stretching', 'safePlace', 'breathing', 'positive', 'selflike', 'selfcare', 'changeSituation', 'content', 'anchors']);
        this.setState({ exercise: exercise });

        setTimeout(() => { this.setState({ showRandomPositiveStatement: false }) }, 3000)

        setTimeout(() => {
            setInterval(() => {
                if (this.state.animationSpeed <= 1 && this.state.animationSpeed >= 0.1)
                    this.setState({ animationSpeed: this.round((this.state.animationSpeed - 0.1), 1) })
            }, 100)
        }, 5000)
        setTimeout(() => { this.setState({ whiteBackground: true }) }, 5500)
        setTimeout(() => { this.setState({ showAcknowledge: true }) }, 7500)
    }

    round(value, precision) {
        let multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    // called onexit of showAcknowledge
    threeDayFunction() {
        isLongerThanThreeDays(res => {
            res ? this.setState({ showHowLong: true, showAcknowledge: false }) : this.setState({ showReasonForFeeling: true, showAcknowledge: false })
        })
    }

    // Function will fade random positive statement after 3 seconds
    showThenFade() { setTimeout(() => { this.setState({ showRandomPositiveStatement: false }) }, 3000) }

    // called from button click on the how long have you been feeling this way component. This then hides the div.
    answeredHowLong() { this.setState({ showHowLong: false }) }

    //called onexit of HowLongHaveYouFeltLikeThis component - trigged from state changing to false in answeredHowLong()
    showReasonForFeeling() { this.setState({ showReasonForFeeling: true }) }

    // called from button click on the do you know why you feel like this div. This sets state for whether user knows why they feel the way they do & either way, will hide the div
    answeredReasonKnown(reasonKnown) { reasonKnown ? this.setState({ knowReasonForFeeling: true, showReasonForFeeling: false }) : this.setState({ knowReasonForFeeling: false, showReasonForFeeling: false }) }


    // called when user pressed submit on the answered reason input, This will hide the div
    answeredReasonInput() { this.setState({ showReasonInput: false }) }

    // called onexit from ReasonForFeelingsInput component - once the user had clicked submit
    showRandQuestion() { this.setState({ showRandomQuestions: true }) }

    // called on button submit when user has answered random question in randomQuestion component. Then hides the random question component.
    answeredRandomQuestion() { this.setState({ showRandomQuestions: false }) }

    //called onexit from randomQuestion component. Shows random positive statements & then called ShowThenFade function
    showRandomPositiveStatement() {
        this.setState({ showRandomPositiveStatement: true })
        this.showThenFade()
    }

    // called onexit of random positive statement & shows random exercise
    showRandomExercise() {
        this.setState({ showRandomExercises: true })
    }

    // called on 'next' button click when user has seen an exercise
    seenExercise() {
        this.setState({ showRandomExercises: false, showAnotherExerciseQuestion: true })
    }

    // called when user presses 'yes' or 'no' to another question
    answeredAnotherExerciseQuestion(another) {
        another ? (this.chooseAnotherExercise()) : this.setState({ showAnotherExerciseQuestion: false, yesAnotherExercise: false })
    }

    // returns a random exercise that isn't the same as the one just seen
    chooseAnotherExercise() {
        let exerciseArray = chooseAnotherRandomExercise(['meditating', 'gratitude', 'stretching', 'safePlace', 'breathing', 'positive', 'selflike', 'selfcare', 'changeSituation', 'content', 'anchors'], this.state.exercise);
        this.setState({ showAnotherExerciseQuestion: false, yesAnotherExercise: true });
        let exercise = ChooseExercise(exerciseArray);
        this.setState({ exercise: exercise });
    }

    // goes back to random exercises if user has previously clicked yes
    afterAskAnotherQuestion() { this.state.yesAnotherExercise ? this.setState({ showRandomExercises: true }) : this.setState({ showRandomExercise: false, showFeedbackStatement: true }) }

    SetExercises = (exercise) => {
        if (exercise == 'meditating') { return <Meditating buttonClick={this.seenExercise.bind(this)}/> }
        if (exercise == 'stretching') { return <Stretching buttonClick={this.seenExercise.bind(this)}/> }
        if (exercise == 'safePlace') { return <SafePlace buttonClick={this.seenExercise.bind(this)}/> }
        if (exercise == 'grounding') { return <Grounding buttonClick={this.seenExercise.bind(this)}/> }
        if (exercise == 'breathing') { return <Breathing buttonClick={this.seenExercise.bind(this)}/> }
        if (exercise == 'changeSituation') { return <ChangeSituation buttonClick={this.seenExercise.bind(this)}/> }
        if (exercise == 'gratitude') { return <Gratitude buttonClick={this.seenExercise.bind(this)}/> }
        if (exercise == 'positive') { return <PositiveMemory buttonClick={this.seenExercise.bind(this)} /> }
        if (exercise === 'selflike') { return <LikeAboutSelf buttonClick={this.seenExercise.bind(this)}/> }
        if (exercise === 'content') { return <ReplayContent buttonClick={this.seenExercise.bind(this)}/> }
        if (exercise === 'anchors') { return <ReplayAnchors buttonClick={this.seenExercise.bind(this)}/> }
        if (exercise === 'selfcare') { return <ReplayCare buttonClick={this.seenExercise.bind(this)}/> }
    }

    render() {
        const randomQuestion = this.state.randQues == 0 ? 
        <PositiveThingQuestion buttonClick={this.answeredRandomQuestion.bind(this)} /> :
        <FriendsLikeQuestion buttonClick={this.answeredRandomQuestion.bind(this)} />;
        const Exercise = this.state.showRandomExercises ? <div>{this.SetExercises(this.state.exercise)}</div> : ''
        return (
            <div>
                <CSSTransition in={this.state.neutralAnimation} timeout={4000} classNames="fade-enter-only" unmountOnExit>
                    <AnimationsLayered speeds={[1]} animations={['neutralNoTrees']} />
                </CSSTransition>  
                <div className='background-box'></div>
                <div className='info-box'>
                    <CSSTransition in={this.state.showRandomQuestions} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showRandomExercise()}>
                        {randomQuestion}
                    </CSSTransition>
                    <CSSTransition in={this.state.showAnotherExerciseQuestion} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.afterAskAnotherQuestion()}><div><AnotherExerciseQuestion onClick={this.answeredAnotherExerciseQuestion.bind(this)} /></div></CSSTransition>
                </div>
                { Exercise }
            </div>
        );
    }
}

export default Exercises;