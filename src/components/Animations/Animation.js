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
import neutralBackground from '../../animations/10_Neutral Weather_River.json'
import okFadeIn from '../../animations/03_OK_Fade In.json'
import okBackground from '../../animations/03_OK_Weather_River .json'
import okFadeOut from '../../animations/03_OK_River_Fade Out.json'
import highFadeIn from '../../animations/02_Happy_River_Fade_In.json'
import high from '../../animations/02_Happy_Weather_River_v8.json'
import highFadeOut from '../../animations/02_Happy_River_Fade_Out.json'

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
        switch(this.props.animation) {
            case 'waves':
                this.setState({ animationData: waves })
                break;
            case 'sun':
                this.setState({ animationData: sun })
                break;
            case 'fish':
                this.setState({ animationData: fish })
                break;
            case 'environment':
                this.setState({ animationData: environment })
                break;
            case 'growing':
                this.setState({ animationData: growing })
                break;
            case 'plant':
                this.setState({ animationData: plant })
                break;
            case 'neutralBackground':
                this.setState({ animationData: neutralBackground })
                break;
            case 'HappyBackground':
                this.setState({ animationData: HappyBackground })
                break;
            case 'tooHighFadeIn':
                this.setState({ animationData: tooHighFadeIn })
                break;
            case 'tooHighFadeOut':
                this.setState({ animationData: tooHighFadeOut })
                break;
            case 'tooHighBackground':
                this.setState({ animationData: tooHighBackground })
                break
            case 'okFadeIn':
                this.setState({ animationData: okFadeIn })
                break
            case 'okBackground':
                this.setState({ animationData: okBackground })
                break
            case 'okFadeOut':
                this.setState({ animationData: okFadeOut })
                break
            case 'highFadeIn':
                this.setState({ animationData: highFadeIn })
                break
            case 'highBackground':
                this.setState({ animationData: highBackground })
                break
            case 'highFadeOut':
                this.setState({ animationData: highFadeOut })
                break
            default:
              // code block
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