import React from 'react';
import { VeryLowAcknowledgement, AnimationsCombined, HowLongHaveYouFeltLikeThis, ReasonForFeelings, PositiveThingQuestion, ReasonForFeelingsInput, AnotherExerciseQuestion, FeedbackStatement, SafeQuestion, FirstAidKit, ContactSupportersQuestion, Contact, AskIfHelped } from '../SharedComponents/SharedComponents';
import { isLongerThanThreeDays, chooseAnotherRandomExercise } from '../../actions/route-functions';
import { CSSTransition } from "react-transition-group";
import { ChooseExercise } from '../Exercises/ChooseExercise';
import { SetExercises } from '../Exercises/SetExercises';
import '../../styles/animation.css';

class VeryLowRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            route: 'veryLow',
            showAcknowledge: true,
            showHowLong: null,
            showReasonForFeeling: null,
            showRandomQuestions: null,
            knowReasonForFeeling: null,
            randQues: null,
            showRandomExercises: null,
            exercise: 'meditating',
            firstAid: null
        }
        this.seenExercise = this.seenExercise.bind(this);
        this.decideFirstAid = this.decideFirstAid.bind(this);
      }

    // method called as soon as all elements on the page are rendered & changed showAcknowledge to false after 3 seconds. This will hide the statement.
    componentDidMount() { 
        // set timeout to say I’m sorry you are feeling like this
        setTimeout( () => { this.setState({ showAcknowledge: false }) }, 3000)
        // random function for random questions
        let question = ChooseExercise(['supporters', 'smallPos', 'safe']);
        this.setState({ randQues: question });
        // setting exercise
        let exercise = ChooseExercise(['stretching', 'gratitude', 'content', 'meditating', 'grounding']);
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

    answeredSafeQuestion(answer) { answer ? (this.setState({ showRandomQuestions: false, firstAid: false })) : (this.setState({ showRandomQuestions: false, firstAid: true }))}

    decideFirstAid() {
        if (this.state.firstAid) {
            this.setState({ showFirstAid: true })
        }
        else if (this.state.contact) {
            this.setState({ showContact: true })
        }
        else {
            this.setState({ showFirstAid: false, showRandomExercises: true })
        }
    }

    // called after user stated if they have contacted their supporters
    answeredContactQuestion(answer) { answer ? (this.setState({ showRandomQuestions: false, contact: false })) : (this.setState({ showRandomQuestions: false, contact: true })) }

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
    
    // returns a random exercise that isn't the same as the one just seen
    chooseAnotherExercise() {
        let exerciseArray = chooseAnotherRandomExercise(['breathing', 'meditating', 'grounding', 'gratitude', 'positive', 'selflike'], this.state.exercise);
        this.setState({ showAnotherExerciseQuestion: false, yesAnotherExercise: true });
        let exercise = ChooseExercise(exerciseArray);
        this.setState({ exercise: exercise });
    }
    // goes back to random exercises if user has previously clicked yes
    afterAskAnotherQuestion() {this.state.yesAnotherExercise ? this.setState({ showRandomExercises: true }): this.setState({ showRandomExercise: false, showFeedbackStatement: true })}

    askIfHelped() {this.setState({showAskIfHelped: true})}

    afterAnsweredIfHelped() {this.setState({showAskIfHelped: false})}

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
            <div className='background-box'>
                <AnimationsCombined />
                <div className='info-box'>   
                    <CSSTransition in={this.state.showAcknowledge} timeout={3000} classNames="fade" unmountOnExit appear onExited={() => this.threeDayFunction()}><VeryLowAcknowledgement /></CSSTransition>
                    <CSSTransition in={this.state.showHowLong} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showReasonForFeeling()}><HowLongHaveYouFeltLikeThis buttonClick={this.answeredHowLong.bind(this)}/></CSSTransition>
                    <CSSTransition in={this.state.showReasonForFeeling} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.afterReasonForFeeling()}><ReasonForFeelings onClick={this.answeredReasonKnown.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showReasonInput} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showRandQuestion()}><ReasonForFeelingsInput buttonClick={this.answeredReasonInput.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showRandomQuestions} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.decideFirstAid()}>{this.state.randQues === 'safe' ? <SafeQuestion onClick={this.answeredSafeQuestion.bind(this)}/> : ((this.state.randQues === 'smallPos') ? <PositiveThingQuestion buttonClick={this.answeredRandomQuestion.bind(this)}/> : <ContactSupportersQuestion onClick={this.answeredContactQuestion.bind(this)} />)}</CSSTransition>
                    <CSSTransition in={this.state.showFirstAid} timeout={2000} classNames="fade" unmountOnExit>{<FirstAidKit />}</CSSTransition>
                    <CSSTransition in={this.state.showContact} timeout={2000} className="fade" unmountOnExit><Contact /></CSSTransition>
                    <CSSTransition in={this.state.showRandomExercises} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.askIfHelped()}><div className='info-box-button'><div>{SetExercises(this.state.exercise)}</div><button className='next-button' onClick={this.seenExercise}>next</button></div></CSSTransition>
                    <CSSTransition in={this.state.showAskIfHelped} timeout={1000} className="fade" unmountOnExit onExited={()=> this.askAnotherExerciseQuestion()}><AskIfHelped exercise={this.state.exercise} onClick={this.afterAnsweredIfHelped.bind(this)}/></CSSTransition>
                    <CSSTransition in={this.state.showAnotherExerciseQuestion} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.afterAskAnotherQuestion()}><div><AnotherExerciseQuestion onClick={this.answeredAnotherExerciseQuestion.bind(this)} /></div></CSSTransition>
                    <CSSTransition in={this.state.showFeedbackStatement} timeout={2000} className="fade" unmountOnExit onExited={() => this.goHome()}><FeedbackStatement dataFromParent = {this.state.route} onClick={this.clickedHome.bind(this)} /></CSSTransition>
                </div>
            </div>
        );
    }
}

export default VeryLowRoute;