import React, { Component } from 'react'
import Lottie from 'react-lottie'
import waves from '../../animations/waves.json'
import sun from '../../animations/sun.json'
import fish from '../../animations/fish.json'

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
            />
        )
    }
}

export default Animation;