import React from 'react';
import { AnimationsLayered } from '../SharedComponents/SharedComponents'
import animatedFish from '../../animations/fish.json';
import Lottie from 'react-lottie'

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Fish: true
        }
    }

    showFish() {
        //Math.floor(Math.random() * (max - min) ) + min;
        const rand = Math.floor(Math.random() * (10000 - 3000) ) + 3000;
        setTimeout( () => { this.setState({ Fish: true }) }, rand)
    }

    hideFish() {
        const rand = Math.floor(Math.random() * (10000 - 3000) ) + 3000;
        setTimeout( () => { this.setState({ Fish: false }) }, rand)
    }

    render() {

        return (
            <div>
                {this.state.Fish ? <AnimationsLayered animations={['happyBackground', 'fish']} /> :
                    <AnimationsLayered animations={['happyBackground']} />
                }
                {this.state.Fish ? this.hideFish() : this.showFish()}
            </div>
        );
    }
}

export default HomePage;