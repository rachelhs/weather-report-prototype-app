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

    render() {
        return (
            <div>
                <CSSTransition in={this.state.breathing} timeout={2000} classNames="fade" unmountOnExit>
                    <div>
                        <div>
                            <h1 className='exercises-title'>Breathing</h1>
                            <AudioPlayer
                                autoPlay={false}
                                src={this.state.url}
                            />
                            <div className="breathingExercise">
                                <MeditationAnimation />
                            </div>
                        </div>
                        <div className="flex-center">
                            <div className="back-button-breathing">
                                <BackButton />
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            </div>
        ) 
    }
}

export default BreathingExercise;
