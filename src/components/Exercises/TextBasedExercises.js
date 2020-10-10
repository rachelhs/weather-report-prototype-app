import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
const firebase = require('firebase/app');
import MeditationAnimation from '../Animations/MeditationAnimation';
import { BackButton } from '../../actions/route-functions'

export const Meditating = () => {
    return <h1 className='info-box-title'>insert meditation exercise here</h1>
}

export class Breathing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
                <h1 className='exercises-title'>Breathing</h1>
                <AudioPlayer
                    autoPlay={false}
                    src={this.state.url}
                />
                <div className="breathingExercise">
                    <MeditationAnimation />
                </div>
            </div>
        )
    }
}

export class Grounding extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: ''
        }
    }

    componentDidMount() {
        const storage = firebase.storage();
        storage.ref('sounds/grounding.mp3').getDownloadURL()
            .then((url) => {
                this.setState({ url: url });
            })
    }

    render() {
        return (<div>
            <h1 className='exercises-title'>Grounding</h1>
            <AudioPlayer
                autoPlay={false}
                src={this.state.url}
                className="audioPlayer"
            />
        </div>
        )
    }
}
    export const Stretching = () => {
        return <h1 className='info-box-title'>insert stretching exercise here</h1>
    }

    export const SafePlace = () => {
        return <h1 className='info-box-title'>insert safe place exercise here</h1>
    }

    export const LessStimulation = () => {
        return <h1 className='info-box-title'>insert less stimulation exercise here</h1>
    }