import React, { Component } from 'react'
import Lottie from 'react-lottie'
import waves from '../../animations/waves.json'
import sun from '../../animations/sun.json'
import fish from '../../animations/Fish2.json'
import environment from '../../animations/environment'
import growing from '../../animations/growing'
import plant from '../../animations/plant'
import HappyBackground from '../../animations/02_Happy_Weather_River_v8.json' 
import tooHighFadeIn from '../../animations/01_Too_High_River_Fade_In.json'
import tooHighFadeOut from '../../animations/01_Too_High_River_Fade_Out.json'
import tooHighBackground from '../../animations/01_Too_High_Weather_River.json'


class Animation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animationData: ''
        }
    }

    componentDidMount() {
        this.chooseAnimation();
    }

    chooseAnimation = () => {
        if (this.props.animation === 'waves') {
            this.setState({ animationData: waves })
        }
        if (this.props.animation === 'sun') {
            this.setState({ animationData: sun })
        }        
        if (this.props.animation === 'fish') {
            this.setState({ animationData: fish })
        }
        if (this.props.animation === 'environment') {
            this.setState({ animationData: environment })
        }
        if (this.props.animation === 'growing') {
            this.setState({ animationData: growing })
        }
        if (this.props.animation === 'plant') {
            this.setState({ animationData: plant })
        }
        if (this.props.animation === 'happyBackground') {
            this.setState({ animationData: HappyBackground })
        }
        if (this.props.animation === 'tooHighFadeIn') {
            this.setState({ animationData: tooHighFadeIn })
        }
        if (this.props.animation === 'tooHighFadeOut') {
            this.setState({ animationData: tooHighFadeOut })
        }
        if (this.props.animation === 'tooHighBackground') {
            this.setState({ animationData: tooHighBackground })
        }
    }

    render() {

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: this.state.animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <Lottie options={defaultOptions}
            speed={this.props.speed}
            />
        )
    }
}

export default Animation;