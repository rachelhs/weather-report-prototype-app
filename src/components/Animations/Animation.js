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
import tooHigh from '../../animations/01_Too_High_Weather_River.json'
import neutralBackground from '../../animations/10_Neutral Weather_River.json'
import okFadeIn from '../../animations/03_OK_Fade In.json'
import ok from '../../animations/03_OK_Weather_River .json'
import okFadeOut from '../../animations/03_OK_River_Fade Out.json'
import highFadeIn from '../../animations/02_Happy_River_Fade_In.json'
import high from '../../animations/02_Happy_Weather_River_v8.json'
import highFadeOut from '../../animations/02_Happy_River_Fade_Out.json'
import nothingFadeIn from '../../animations/04_Nothing_Fade_In.json'
import nothing from '../../animations/04_Nothing_Weather_River.json'
import nothingFadeOut from '../../animations/04_Nothing_River_Fade_Out.json'
import lowFadeIn from '../../animations/05_Low_Fade_In.json'
import low from '../../animations/05_Low_Weather_River.json'
import lowFadeOut from '../../animations/05_Low_River_Fade_Out.json'
import mediumLowFadeIn from '../../animations/06_Medium_Low_Fade_In.json'
import mediumLow from '../../animations/06_Medium_Low_Weather_River.json'
import mediumLowFadeOut from '../../animations/06_Medium_Low_River_Fade_Out.json'
import veryLowFadeIn from '../../animations/07_Very_Low_Fade_In.json'
import veryLow from '../../animations/07_Very_Low_v1.json'
import veryLowFadeOut from '../../animations/07_Very_Low_River_Fade_Out.json'
import lowWithEnergyFadeIn from '../../animations/08_Low_But_with_Energy_Fade_In.json'
import lowWithEnergy from '../../animations/08_Low_But_with_Energy_Weather_River.json'
import lowWithEnergyFadeOut from '../../animations/08_Low_But_with_Energy_River_Fade_Out.json'

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
            case 'tooHigh':
                this.setState({ animationData: tooHigh })
                break
            case 'okFadeIn':
                this.setState({ animationData: okFadeIn })
                break
            case 'ok':
                this.setState({ animationData: ok })
                break
            case 'okFadeOut':
                this.setState({ animationData: okFadeOut })
                break
            case 'highFadeIn':
                this.setState({ animationData: highFadeIn })
                break
            case 'high':
                this.setState({ animationData: high })
                break
            case 'highFadeOut':
                this.setState({ animationData: highFadeOut })
                break
            case 'nothingFadeIn':
                this.setState({ animationData: nothingFadeIn })
                break
            case 'nothing':
                this.setState({ animationData: nothing })
                break
            case 'nothingFadeOut':
                this.setState({ animationData: nothingFadeOut })
                break
            case 'lowFadeIn':
                this.setState({ animationData: lowFadeIn })
                break
            case 'low':
                this.setState({ animationData: low })
                break
            case 'lowFadeOut':
                this.setState({ animationData: lowFadeOut })
                break
            case 'mediumLowFadeIn':
                this.setState({ animationData: mediumLowFadeIn })
                break
            case 'mediumLow':
                this.setState({ animationData: mediumLow })
                break
            case 'mediumLowFadeOut':
                this.setState({ animationData: mediumLowFadeOut })
                break
            case 'veryLowFadeIn':
                this.setState({ animationData: veryLowFadeIn })
                break
            case 'veryLow':
                this.setState({ animationData: veryLow })
                break
            case 'veryLowFadeOut':
                this.setState({ animationData: veryLowFadeOut })
                break
            case 'lowWithEnergyFadeIn':
                this.setState({ animationData: lowWithEnergyFadeIn })
                break
            case 'lowButWithEnergy':
                this.setState({ animationData: lowWithEnergy })
                break
            case 'lowWithEnergyFadeOut':
                this.setState({ animationData: lowWithEnergyFadeOut })
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