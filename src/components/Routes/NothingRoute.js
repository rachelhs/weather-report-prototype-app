import React from 'react';
import { AnimationsCombined, ReasonForFeelings, ReasonForFeelingsInput, PositiveThingQuestion, PositiveChangeQuestion, AnotherExerciseQuestion, FeedbackStatement } from '../SharedComponents/SharedComponents';
import { randomQuestionNumber, chooseAnotherRandomExercise  } from '../../actions/route-functions';
import { CSSTransition } from "react-transition-group";
import { ChooseExercise } from '../Exercises/ChooseExercise';
import { SetExercises } from '../Exercises/SetExercises';
import '../../styles/animation.css';
const data = require('../../data/data.json');

class Nothing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            route: 'nothing',
            showReasonForFeeling: true,
            knowReasonForFeeling: null,
            randQues: null,
            exercise: '',
            randQuesOrExercise: null,
            showrandQuesOrExercise: null,
            showAnotherExerciseQuestion: null,
        }
      }

    // method called as soon as all elements on the page are rendered & changed showAcknowledge to false after 3 seconds. This will hide the statement.
    componentDidMount() { 
        // random function for random questions
        this.setState({ randQues: randomQuestionNumber(2) });
        // choose whether to show random questions or exercises
        this.setState({ randQuesOrExercise: randomQuestionNumber(2) })
        // setting exercise
        let exercise = ChooseExercise(['breathing', 'meditating', 'grounding', 'gratitude', 'positive']);
        this.setState({ exercise: exercise });
    }


    // called from button click on the do you know why you feel like this div. This sets state for whether user knows why they feel the way they do & either way, will hide the div
    answeredReasonKnown(reasonKnown){ reasonKnown ? this.setState({ knowReasonForFeeling: true, showReasonForFeeling: false }) : this.setState({ knowReasonForFeeling: false, showReasonForFeeling: false }) }
    
    // called onexit from ReasonForFeelings component, trigged from answeredReasonKnown() function above. This function will either show the input box or go onto the random questions section
    afterReasonForFeeling() { this.state.knowReasonForFeeling ? this.setState({ showReasonInput: true}) : this.setState({ showrandQuesOrExercise: true }) }
    
    // called when user pressed submit on the answered reason input, This will hide the div
    answeredReasonInput() { this.setState({ showReasonInput: false }) }
   
    // called onexit from ReasonForFeelingsInput component - once the user had clicked submit
    showrandQuesOrExercise() { this.setState({ showrandQuesOrExercise: true })}
    
    // called on button submit when user has answered random question in randomQuestion component. Then hides the random question component.
    answeredRandomQuestion() { this.setState({ showrandQuesOrExercise: false }) }

    // called on 'next' button click when user has seen an exercise
    seenExercise() { this.setState({ showrandQuesOrExercise: false }) }

    // called on onexit after a random exercise and asks user if they want another
    askAnotherExerciseQuestion() { this.setState({ showAnotherExerciseQuestion: true }) }
    
    // called when user presses 'yes' or 'no' to another question
    answeredAnotherExerciseQuestion(another) {
        another ? (this.chooseAnotherExercise()) : this.setState({ showAnotherExerciseQuestion: false, yesAnotherExercise: false })}
    
    // returns a random exercise that isn't the same as the one just seen
    chooseAnotherExercise() {
        console.log('made it here')
        let exerciseArray = chooseAnotherRandomExercise(['breathing', 'meditating', 'grounding', 'gratitude', 'positive'], this.state.exercise);
        this.setState({ showAnotherExerciseQuestion: false, yesAnotherExercise: true });
        let exercise = ChooseExercise(exerciseArray);
        this.setState({ exercise: exercise });
    }
    
    // goes back to random exercises if user has previously clicked yes
    afterAskAnotherQuestion() {this.state.yesAnotherExercise ? this.setState({ showrandQuesOrExercise: true }): this.setState({ showrandQuesOrExercise: false, showFeedbackStatement: true })}

    // triggered when user clicks to go home
    clickedHome() {
        this.setState({ showFeedbackStatement: false })
    }

    // goes to home page
    goHome() {
        this.props.history.push('/home');
    }
    render() {
        const randomQuestion = this.state.randQues == 0 ? <PositiveThingQuestion buttonClick={this.answeredRandomQuestion.bind(this)} /> : <PositiveChangeQuestion buttonClick={this.answeredRandomQuestion.bind(this)} />;
        const questionOrExercise = this.state.randQuesOrExercise == 0 ? randomQuestion : <div className='info-box-button'><div>{SetExercises(this.state.exercise)}</div><button className='next-button' onClick={this.seenExercise.bind(this)}>next</button></div>;

        return (        
            <div className='background-box'>
                <AnimationsCombined />
                <div className='info-box'>   
                    <CSSTransition in={this.state.showReasonForFeeling} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.afterReasonForFeeling()}><ReasonForFeelings onClick={this.answeredReasonKnown.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showReasonInput} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showrandQuesOrExercise()}><ReasonForFeelingsInput buttonClick={this.answeredReasonInput.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showrandQuesOrExercise} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.askAnotherExerciseQuestion()}>{ questionOrExercise }</CSSTransition>
                    <CSSTransition in={this.state.showAnotherExerciseQuestion} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.afterAskAnotherQuestion()}><div><AnotherExerciseQuestion onClick={this.answeredAnotherExerciseQuestion.bind(this)} /></div></CSSTransition>
                    <CSSTransition in={this.state.showFeedbackStatement} timeout={2000} className="fade" unmountOnExit onExited={() => this.goHome()}><FeedbackStatement dataFromParent = {this.state.route} onClick={this.clickedHome.bind(this)} /></CSSTransition>
                </div>
            </div>
        );
    }
}

export default Nothing;