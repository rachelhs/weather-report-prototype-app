import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
const firebase = require('firebase/app');
import MeditationAnimation from '../Animations/MeditationAnimation';
import { BackButton } from '../../actions/route-functions'

export class Meditating extends React.Component {
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
            <div className="no-white-overlay">
                <h2 className='exercises-title'>Meditation Exercise</h2>
                <AudioPlayer
                    autoPlay={false}
                    src={this.state.url}
                    loop={false}
                />
                <div className="breathingExercise">
                    <MeditationAnimation />
                </div>
                <div className="flex-center">
                    <div className='back-button-audio'>
                        <button className='next-button-dark free-form-submit' onClick={this.props.buttonClick}>NEXT</button>
                    </div>
                </div>
            </div>
        )
    }
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
            <div className="no-white-overlay">
                <h2 className='exercises-title'>Breathing Exercise</h2>
                <AudioPlayer
                    autoPlay={false}
                    src={this.state.url}
                    loop={false}
                />
                <div className="breathingExercise">
                    <MeditationAnimation />
                </div>
                <div className="flex-center">
                    <div className='back-button-audio'>
                        <button className='next-button-dark free-form-submit' onClick={this.props.buttonClick}>NEXT</button>
                    </div>
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
        return (
            <div className="no-white-overlay">
                <h2 className='exercises-title'>Grounding Exercise</h2>
                <p>text here</p>
                <AudioPlayer
                    autoPlay={false}
                    src={this.state.url}
                    className="audioPlayer"
                />
            </div>
        )
    }
}

export class Stretching extends React.Component {
    render() {
        return (
            <div className="no-white-overlay">
                <h2 className='grounding-title'>Stretching</h2>
                <p>This is a stretching video FINALISE TEXT</p>
                <div className="flex-center">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/Sh01VlBomI8"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                </div>
                <div className="flex-center">
                    <div className='back-button-stretching'>
                        <button className='next-button-dark free-form-submit' onClick={this.props.buttonClick}>NEXT</button>
                    </div>
                </div>
            </div>
        )
    }
}

export class SafePlace extends React.Component {
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
        return (
            <div className="no-white-overlay">
                <h2 className='exercises-title'>Safe Place Exercise</h2>
                <p>text here</p>
                <AudioPlayer
                    autoPlay={false}
                    src={this.state.url}
                    className="audioPlayer"
                />
            </div>
        )
    }
}
    

    export const LessStimulation = () => {
        return <h1 className='info-box-title'>insert less stimulation exercise here</h1>
    }