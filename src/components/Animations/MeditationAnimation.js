import React, { Component } from 'react'
import Lottie from 'react-lottie'
import meditation from '../../animations/11_Meditation_Screen_v1.json'

class MeditationAnimation extends React.Component {

    render() {

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: meditation,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <Lottie options={defaultOptions}
                speed={this.props.speed}
                isPaused={this.props.isPaused}
                width={200}
                height={200}
            />
        )
    }

}

export default MeditationAnimation;