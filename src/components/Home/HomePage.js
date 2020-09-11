import React from 'react';
import BackgroundAnimation from '../Animations/BackgroundAnimation'
import ForegroundAnimation from '../Animations/ForegroundAnimation'
import animatedFish from '../../animations/fish.json';
import Lottie from 'react-lottie'

class HomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    clickedFish() {
        console.log("fish clicked")
    }
    
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animatedFish,
            rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
            }
        };
        return (
            <div>
                <div className='background-anim'>
                    <BackgroundAnimation />
                </div>
                <div className='foreground-anim'>
                    <ForegroundAnimation />
                </div>
                <a className='fish-anim' href="#" onClick={this.clickedFish.bind(this)}>
                    <Lottie 
                    options={defaultOptions}
                    height={400}
                    width={400}
                    zIndex={100}
                    />
                </a>
            </div>
        );
    }
}

export default HomePage;