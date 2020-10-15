import React from 'react';
import { CSSTransition } from "react-transition-group";
import { Grounding } from '../Exercises/TextBasedExercises'
const firebase = require('firebase/app');

export class GroundingExercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grounding: true,
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

    backButton() {
        this.props.history.push({
            pathname: '/home',
        })
    }
    

    render() {
        return (
            <div>
                <CSSTransition in={this.state.grounding} timeout={2000} classNames="fade" unmountOnExit>
                    <div>
                        <Grounding buttonValue={"Home"} buttonClick={this.backButton.bind(this)}/>
                    </div>
                </CSSTransition>
            </div>
        ) 
    }
}

export default GroundingExercise;
