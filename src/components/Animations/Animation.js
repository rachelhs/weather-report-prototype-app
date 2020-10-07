import React, { Component } from 'react'
import Lottie from 'react-lottie'
import sun from '../../animations/sun.json'
import fish from '../../animations/00_Fish_Still.json'
import environment from '../../animations/10_Neutral_BG_With_Trees.json'
import growing from '../../animations/growing'
import lilypad from '../../animations/Lily_Pad.json'
import roots from '../../animations/Roots.json'
import HappyBackground from '../../animations/02_Happy_Weather_River_v8.json' 
import tooHighFadeIn from '../../animations/01_Too_High_River_Fade_In.json'
import tooHighFadeOut from '../../animations/01_Too_High_River_Fade_Out.json'
import tooHigh from '../../animations/01_Too_High_Weather_River.json'
import neutralBackground from '../../animations/10_Neutral_River All Assets'
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
import suicidalFadeIn from '../../animations/09_Suicidal_Fade_In.json'
import suicidal from '../../animations/09_Suicidal_Weather_River.json'
import suicidalFadeOut from '../../animations/09_Suicidal_River_Fade_Out.json'
import fishSwimming from '../../animations/00_Fish_Swimming_across'
import riverbed from '../../animations/Riverbed.json'
import riverLevel from '../../animations/10_River_Level.json'
import neutralNoTrees from '../../animations/10_Neutral_River_No Trees.json'
import neutralTreesNoLily from '../../animations/10_Neutral Weather_River.json'
import meditation from '../../animations/11_Meditation_Screen_v1.json'

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
            case 'riverbed':
                this.setState({ animationData: riverbed })
                break;
            case 'riverLevel':
                this.setState({ animationData: riverLevel })
                break;
            case 'roots':
                this.setState({ animationData: roots })
                break;
            case 'sun':
                this.setState({ animationData: sun })
                break;
            case 'fish':
                this.setState({ animationData: fish })
                break;
            case 'fishSwimming':
                this.setState({ animationData: fishSwimming })
                break;
            case 'environment':
                this.setState({ animationData: environment })
                break;
            case 'growing':
                this.setState({ animationData: growing })
                break;
            case 'lilypad':
                this.setState({ animationData: lilypad })
                break;
            case 'arrow':
                this.setState({ animationData: arrow })
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
            case 'suicidalFadeIn':
                this.setState({ animationData: suicidalFadeIn })
                break
            case 'suicidal':
                this.setState({ animationData: suicidal })
                break
            case 'suicidalFadeOut':
                this.setState({ animationData: suicidalFadeOut })
                break
            case 'neutralNoTrees':
                this.setState({ animationData: neutralNoTrees})
                break
            case 'meditation':
                this.setState({ animationData: meditation })
                break
            case 'neutralTreesNoLily':
                this.setState({ animationData: neutralTreesNoLily })
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
            isPaused={this.props.isPaused}
            />
        )
    }
}

export default Animation;