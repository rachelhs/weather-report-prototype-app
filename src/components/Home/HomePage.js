import React from 'react';
import { AnimationsLayered } from '../SharedComponents/SharedComponents'
import Animation from '../../components/Animations/Animation'
import { FishModal, AnchorsModal, PebblesModal } from '../SharedComponents/HomeComponents'
import { CSSTransition } from "react-transition-group";
import Lottie from 'react-lottie'
import tornado from '../../animations/08_Low_But_with_Energy_Weather_River.json'

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Fish: false,
            weather: this.props.location.state ? this.props.location.state.weather : 'neutralBackground',
            showButton: false,
            tornadoFadeOut: false,
            tornadoTemp: false,
            speed: 1.4,
        }
    }

    componentDidMount() {
        const rand = Math.random() * (30000 - 15000) + 15000
        let intervalId = setInterval(() => {
            this.setState(prevState => {
                if (prevState.Fish === true) {
                    this.hideButton()
                    return {
                        Fish: false
                    };
                } else {
                    this.showButton()
                    return {
                        Fish: true,
                    };
                }
            });

        }, rand);

        this.setState({
            intervalId
        });
        if (this.state.weather == "tornado") {

            this.setState({ tornadoTemp: true })
            // setTimeout( () => { this.setState({ tornadoFadeOut: true }) }, 6000)
            // setTimeout( () => { this.setState({ backToNeutral: true, tornadoFadeOut: false }) }, 23000)
        }
    }

    showButton() {
        setTimeout( () => { this.setState({ showButton: true }) }, 3500)
    }

    hideButton() {
        this.setState({ showButton: false })
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    onAnimationComplete() {
        this.setState({ tornadoTemp: false, tornadoFadeOut: true })
        this.setState({ speed: 0 })
        
    }

    render() {
        console.log('weather', this.state.weather)
        console.log('tornadoFadeOut',this.state.tornadoFadeOut )
        console.log('tornadoTemp', this.state.tornadoTemp)
        const defaultOptions = {
            loop: false,
            autoplay: false,
            animationData: tornado,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
            }
        };
        let tornadoFadeOut = this.state.tornadoFadeOut ? <AnimationsLayered speeds={[1.4]} animations={['tornadoFadeOut']} /> : ''
        // let backToNeutral = this.state.backToNeutral ? <AnimationsLayered speeds={[0.4]} animations={['neutralBackground']} /> : ''
        return (
            <div>
                {/* <AnimationsLayered speeds={[0.4]} animations={[this.state.weather]} /> */}
                {(this.state.weather == 'tornado') ?
                <div className='anim-0'><Lottie options={defaultOptions} speed={this.state.speed} eventListeners={[{ eventName: 'complete', callback: () => this.onAnimationComplete() }]}/></div>
                : '' } 
                { tornadoFadeOut } 
                <AnchorsModal />
                <PebblesModal />
                {(this.state.Fish) ? 
                <div className='anim-2'><Animation animation='fishSwimming'/></div>
                : ''}                
                <FishModal fishAppears={this.state.showButton} />
            </div>
        );
    }
}

export default HomePage;