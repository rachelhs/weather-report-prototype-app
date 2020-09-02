import React from 'react';
import BackgroundAnimation from '../Animations/BackgroundAnimation'
import ForegroundAnimation from '../Animations/ForegroundAnimation'
import animatedFish from '../../animations/fish.json';
import Lottie from 'react-lottie'

export default function HomePage() {
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
            <a className='fish-anim' href="#" onclick="console.log('The link was clicked.')">
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