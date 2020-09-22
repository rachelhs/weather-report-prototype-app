import React from 'react';
import { AnimationsLayered } from '../SharedComponents/SharedComponents'
import animatedFish from '../../animations/fish.json';
import Lottie from 'react-lottie'

class HomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    // clickedFish() {
    //     console.log("fish clicked")
    // }
    
    render() {
        // const defaultOptions = {
        //     loop: true,
        //     autoplay: true,
        //     animationData: animatedFish,
        //     rendererSettings: {
        //     preserveAspectRatio: "xMidYMid slice"
        //     }
        // };
        return (
            <div>
            <AnimationsLayered animations={['happyBackground', 'fish']} />
            </div>
        );
    }
}

export default HomePage;

// <a className='fish-anim' href="#" onClick={this.clickedFish.bind(this)}>
// <Lottie 
// options={defaultOptions}
// height={400}
// width={400}
// zIndex={100}
// />
// </a>