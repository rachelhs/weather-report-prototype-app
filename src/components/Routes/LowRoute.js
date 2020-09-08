import React from 'react';
import { LowAcknowledgement, AnimationsCombined, HowLongHaveYouFeltLikeThis, ReasonForFeelings, ReasonForFeelingsInput, PositiveThingQuestion, HelpedCopeQuestion, AnotherExerciseQuestion, FeedbackStatement } from '../SharedComponents/SharedComponents';
import { isLongerThanThreeDays, randomQuestionNumber } from '../../actions/route-functions';
import { CSSTransition } from "react-transition-group";
import { ChooseExercise } from '../Exercises/ChooseExercise';
import { SetExercises } from '../Exercises/SetExercises';
import '../../styles/animation.css';

class LowRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAcknowledge: true,
            showHowLong: null,
            showReasonForFeeling: null,
            showRandomQuestions: null,
            knowReasonForFeeling: null,
            randQues: 0,
            showRandomExercises: null,
            exercise: 'meditating',
        }
        this.seenExercise = this.seenExercise.bind(this);
      }

    // method called as soon as all elements on the page are rendered & changed showAcknowledge to false after 3 seconds. This will hide the statement.
    componentDidMount() { 
        // set timeout to say I’m sorry you are feeling like this
        setTimeout( () => { this.setState({ showAcknowledge: false }) }, 3000)
        // random function for random questions
        this.setState({ randQues: randomQuestionNumber(2) });
        // setting exercise
        let exercise = ChooseExercise(['breathing', 'meditating', 'grounding', 'gratitude', 'positive', 'selflike']);
        this.setState({ exercise: exercise });
    }

    // called onexit of showAcknowledge
    threeDayFunction() { 
        isLongerThanThreeDays(res => {
            res ? this.setState({ showHowLong: true, showAcknowledge: false }) : this.setState({ showReasonForFeeling: true, showAcknowledge: false })
        })
    }

    // called from button click on the how long have you been feeling this way component. This then hides the div.
    answeredHowLong() { this.setState({ showHowLong: false }) }
    
    //called onexit of HowLongHaveYouFeltLikeThis component - trigged from state changing to false in answeredHowLong()
    showReasonForFeeling() { this.setState({ showReasonForFeeling: true }) }

    // called from button click on the do you know why you feel like this div. This sets state for whether user knows why they feel the way they do & either way, will hide the div
    answeredReasonKnown(reasonKnown){ reasonKnown ? this.setState({ knowReasonForFeeling: true, showReasonForFeeling: false }) : this.setState({ knowReasonForFeeling: false, showReasonForFeeling: false }) }
    
    // called onexit from ReasonForFeelings component, trigged from answeredReasonKnown() function above. This function will either show the input box or go onto the random questions section
    afterReasonForFeeling() { this.state.knowReasonForFeeling ? this.setState({ showReasonInput: true}) : this.setState({ showRandomQuestions: true }) }
    
    // called when user pressed submit on the answered reason input, This will hide the div
    answeredReasonInput() { this.setState({ showReasonInput: false }) }

    // called onexit from ReasonForFeelingsInput component - once the user had clicked submit
    showRandQuestion() { this.setState({ showRandomQuestions: true })}

    // called on button submit when user has answered random question in randomQuestion component. Then hides the random question component.
    answeredRandomQuestion() { this.setState({ showRandomQuestions: false }) }

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
    answeredAnotherExerciseQuestion(another) {another ? (this.chooseAnotherExercise()) : this.setState({ showAnotherExerciseQuestion: false, yesAnotherExercise: false })}
    
    chooseAnotherExercise() {
        let exerciseArray = ['breathing', 'meditating', 'grounding', 'gratitude', 'positive', 'selflike'];
        for (let i = 0; i < exerciseArray.length; i++) {
            if (exerciseArray[i] === this.state.exercise) {
                exerciseArray.splice(i, 1);
            }
        }
        this.setState({ showAnotherExerciseQuestion: false, yesAnotherExercise: true });
        let exercise = ChooseExercise(exerciseArray);
        this.setState({ exercise: exercise });
    }
    // goes back to random exercises if user has previously clicked yes
    afterAskAnotherQuestion() {this.state.yesAnotherExercise ? this.setState({ showRandomExercises: true }): this.setState({ showRandomExercise: false, showFeedbackStatement: true })}

    // triggered when user clicks to go home
    clickedHome() {
        this.setState({ showFeedbackStatement: false })
    }

    // goes to home page
    goHome() {
        this.props.history.push('/home');
    }

    render() {
        const randomQuestion = this.state.randQues == 0 ? <PositiveThingQuestion buttonClick={this.answeredRandomQuestion.bind(this)} /> : <HelpedCopeQuestion buttonClick={this.answeredRandomQuestion.bind(this)} />;
        return (        
            <div className='background-box'>
                <AnimationsCombined />
                <div className='info-box'>   
                    <CSSTransition in={this.state.showAcknowledge} timeout={3000} classNames="fade" unmountOnExit appear onExited={() => this.threeDayFunction()}><LowAcknowledgement /></CSSTransition>
                    <CSSTransition in={this.state.showHowLong} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showReasonForFeeling()}><HowLongHaveYouFeltLikeThis buttonClick={this.answeredHowLong.bind(this)}/></CSSTransition>
                    <CSSTransition in={this.state.showReasonForFeeling} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.afterReasonForFeeling()}><ReasonForFeelings onClick={this.answeredReasonKnown.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showReasonInput} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showRandQuestion()}><ReasonForFeelingsInput buttonClick={this.answeredReasonInput.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showRandomQuestions} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showRandomExercise()}>{ randomQuestion }</CSSTransition>
                    <CSSTransition in={this.state.showRandomExercises} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.askAnotherExerciseQuestion()}><div className='info-box-button'><div>{SetExercises(this.state.exercise)}</div><button className='next-button' onClick={this.seenExercise}>next</button></div></CSSTransition>
                    <CSSTransition in={this.state.showAnotherExerciseQuestion} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.afterAskAnotherQuestion()}><div><AnotherExerciseQuestion onClick={this.answeredAnotherExerciseQuestion.bind(this)} /></div></CSSTransition>
                    <CSSTransition in={this.state.showFeedbackStatement} timeout={2000} className="fade" unmountOnExit onExited={() => this.goHome()}><FeedbackStatement onClick={this.clickedHome.bind(this)} /></CSSTransition>
                </div>
            </div>
        );
    }
}

export default LowRoute;