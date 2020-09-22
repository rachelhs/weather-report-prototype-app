import React, { Component } from 'react'
import Lottie from 'react-lottie'
import waves from '../../animations/waves.json'
import sun from '../../animations/sun.json'
import fish from '../../animations/Fish2.json'
import environment from '../../animations/environment'
import growing from '../../animations/growing'
import plant from '../../animations/plant'
import HappyBackground from '../../animations/02_Happy_Weather_River_v8.json' 


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
            speed={0.1}
            />
        )
    }
}

export default Animation;