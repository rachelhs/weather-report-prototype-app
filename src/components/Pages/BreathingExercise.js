import React from 'react';
const data = require('../../data/data.json');
import { AnimationsLayered } from '../SharedComponents/SharedComponents';
import { CSSTransition } from "react-transition-group";
import { BackButton } from '../../actions/route-functions'
import { Breathing } from '../Exercises/TextBasedExercises'

export class BreathingExercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breathing: true
        }
    }
    render() {
        return (
            <div className='background-box-colour'>
                <CSSTransition in={this.state.breathing} timeout={2000} classNames="fade" unmountOnExit>
                    <div>
                        <Breathing />
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
