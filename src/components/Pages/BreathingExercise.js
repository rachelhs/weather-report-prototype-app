import React from 'react';
const data = require('../../data/data.json');
import { AnimationsLayered } from '../SharedComponents/SharedComponents';
import { CSSTransition } from "react-transition-group";
import { BackButton } from '../../actions/route-functions'
import { Breathing } from '../Exercises/TextBasedExercises'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import MeditationAnimation from '../Animations/MeditationAnimation';
const firebase = require('firebase/app');
import { useHistory } from 'react-router-dom'

export class BreathingExercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breathing: true,
            url: ''
        }
    }

    componentDidMount() {
        const storage = firebase.storage();
        storage.ref('sounds/breathing.mp3').getDownloadURL()
            .then((url) => {
                this.setState({ url: url });
            })
    }

    backButton() {
        this.props.history.push({
            pathname: '/home',
        })
    }
    

    render() {
        return (
            <div>
                <CSSTransition in={this.state.breathing} timeout={2000} classNames="fade" unmountOnExit>
                    <div>
                        < Breathing buttonClick={this.backButton.bind(this)}/>
                    </div>
                </CSSTransition>
            </div>
        ) 
    }
}

export default BreathingExercise;
