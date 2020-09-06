import React, { Component } from 'react';
import { Transition } from "react-transition-group";

export default class Practise extends Component {

    constructor() {
        super();
        this.state = {
            bool: false
        }
      }

    toogle = () => {
        this.setState(prevState => ({
            bool: !prevState.bool
        }))
    }

    render() {
        const defaultStyle = {
            transition: `opacity 400ms ease-in-out`,
            opacity: 0,
        }
        const transitionStyle = {
            entering: { opacity: 0 },
            entered: { opacity: 1 },
            exiting: { opacity: 1 },
            exited: { display: "none" }
        };
        console.log('bool', this.state.bool)
        const { toogle, state: { bool }} = this
        return (
            <div>
                <button onClick={ toogle }>Fade</button>
                <Transition
                    in={ bool }
                    timeout={ 400}
                    onExiting={ node => {console.dir(node) }}>
                    {status => (
                        <div style={{
                            ...defaultStyle,
                            ...transitionStyle[status]
                        }}>
                            This text should fade in and out
                            {console.log(status)}
                        </div>
                    )}
                </Transition>
            </div>
        );
    }
}