import React from 'react';
import { Acknowledgement, AnimationsLayered, HowLongHaveYouFeltLikeThis, ReasonForFeelings, ReasonForFeelingsInput, AnotherExerciseQuestion, FeedbackStatement } from '../SharedComponents/SharedComponents';
import { PositiveThingQuestion, FriendsLikeQuestion } from '../SharedComponents/MentalHealthQuestions';
import { isLongerThanThreeDays, randomQuestionNumber, chooseAnotherRandomExercise } from '../../actions/route-functions';
import { CSSTransition } from "react-transition-group";
import { ChooseExercise } from '../Exercises/ChooseExercise';
import { SetExercises } from '../Exercises/SetExercises';
import '../../styles/animation.css';
const data = require('../../data/data.json');

class MediumLowRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            route: 'mediumLow',
            showAcknowledge: false,
            showHowLong: null,
            showReasonForFeeling: null,
            showRandomQuestions: null,
            knowReasonForFeeling: null,
            randQues: 0,
            randPositive: null,
            showRandomPositiveStatement: null,
            showRandomExercises: null,
            exercise: '',
            neutralAnimation: true,
            mediumLowFadeIn: false,
            whiteBackground: false,
            animationSpeed: 1
        }
        this.showThenFade = this.showThenFade.bind(this);
    }

    // method called as soon as all elements on the page are rendered & changed showAcknowledge to false after 3 seconds. This will hide the statement.
    componentDidMount() {
        // set timeout to say I’m sorry you are feeling like this
        setTimeout(() => { this.setState({ showAcknowledge: false }) }, 10500)
        // random function for random questions
        this.setState({ randQues: randomQuestionNumber(2) });
        // random function for random positive statements
        const positiveArray = data[4].mediumLow.positiveStatements;
        this.setState({ randPositive: randomQuestionNumber(positiveArray.length) });
        // setting exercise
        let exercise = ChooseExercise(['breathing']);
        //let exercise = ChooseExercise(['meditating', 'gratitude', 'positive', 'selflike', 'selfcare']);
        this.setState({ exercise: exercise });
        setTimeout(() => { this.setState({ showRandomPositiveStatement: false }) }, 3000)

        setTimeout(() => { this.setState({ neutralAnimation: false, mediumLowFadeIn: true }) }, 500)
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

    // called onexit from ReasonForFeelings component, trigged from answeredReasonKnown() function above. This function will either show the input box or go onto the random questions section
    afterReasonForFeeling() { this.state.knowReasonForFeeling ? this.setState({ showReasonInput: true }) : this.setState({ showRandomQuestions: true }) }

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
        this.setState({ showRandomExercises: false })
    }

    // called on onexit after a random exercise and asks user if they want another
    askAnotherExerciseQuestion() {
        this.setState({ showAnotherExerciseQuestion: true })
    }

    // called when user presses 'yes' or 'no' to another question
    answeredAnotherExerciseQuestion(another) {
        console.log('another', another)
        another ? (this.chooseAnotherExercise()) : this.setState({ showAnotherExerciseQuestion: false, yesAnotherExercise: false })
    }

    // returns a random exercise that isn't the same as the one just seen
    chooseAnotherExercise() {
        let exerciseArray = chooseAnotherRandomExercise(['meditating', 'gratitude', 'positive', 'selflike', 'selfcare'], this.state.exercise);
        this.setState({ showAnotherExerciseQuestion: false, yesAnotherExercise: true });
        let exercise = ChooseExercise(exerciseArray);
        this.setState({ exercise: exercise });
    }

    // goes back to random exercises if user has previously clicked yes
    afterAskAnotherQuestion() { this.state.yesAnotherExercise ? this.setState({ showRandomExercises: true }) : this.setState({ showRandomExercise: false, showFeedbackStatement: true }) }

    render() {
        const randomQuestion = this.state.randQues == 0 ? <PositiveThingQuestion buttonClick={this.answeredRandomQuestion.bind(this)} /> : <FriendsLikeQuestion buttonClick={this.answeredRandomQuestion.bind(this)} />;
        return (
            <div>
                <CSSTransition in={this.state.neutralAnimation} timeout={4000} classNames="fade-enter-only" unmountOnExit>
                    <AnimationsLayered speeds={[1]} animations={['neutralBackground']} />
                </CSSTransition>
                <CSSTransition in={this.state.mediumLowFadeIn} timeout={4000} classNames="fade-enter-only">
                    <AnimationsLayered speeds={[this.state.animationSpeed]} animations={['mediumLowFadeIn']} />
                </CSSTransition>
                <CSSTransition in={this.state.whiteBackground} timeout={2000} classNames="fade" unmountOnExit>
                    <div className='background-box'></div>
                </CSSTransition>
                <div className='info-box'>
                    <CSSTransition in={this.state.showAcknowledge} timeout={3000} classNames="fade" unmountOnExit appear onExited={() => this.threeDayFunction()}><Acknowledgement dataFromParent={this.state.route} /></CSSTransition>
                    <CSSTransition in={this.state.showHowLong} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showReasonForFeeling()}><HowLongHaveYouFeltLikeThis buttonClick={this.answeredHowLong.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showReasonForFeeling} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.afterReasonForFeeling()}><ReasonForFeelings onClick={this.answeredReasonKnown.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showReasonInput} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showRandQuestion()}><ReasonForFeelingsInput buttonClick={this.answeredReasonInput.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showRandomQuestions} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showRandomPositiveStatement()}>{randomQuestion}</CSSTransition>
                    <CSSTransition in={this.state.showRandomPositiveStatement} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showRandomExercise()}><h1 className='info-box-title'>{data[4].mediumLow.positiveStatements[this.state.randPositive]}</h1></CSSTransition>
                    <CSSTransition in={this.state.showRandomExercises} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.askAnotherExerciseQuestion()}><div className='exercise-container'><div>{SetExercises(this.state.exercise)}</div><button className='next-button' onClick={this.seenExercise.bind(this)}>next</button></div></CSSTransition>
                    <CSSTransition in={this.state.showAnotherExerciseQuestion} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.afterAskAnotherQuestion()}><div><AnotherExerciseQuestion onClick={this.answeredAnotherExerciseQuestion.bind(this)} /></div></CSSTransition>
                    <CSSTransition in={this.state.showFeedbackStatement} timeout={2000} className="fade" unmountOnExit><FeedbackStatement dataFromParent={this.state.route}/></CSSTransition>
                </div>
            </div>
        );
    }
}

export default MediumLowRoute;