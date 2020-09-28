import React from 'react';
import { AnimationsLayered } from '../SharedComponents/SharedComponents'
import Animation from '../../components/Animations/Animation'
import { FishModal, AnchorsModal, PebblesModal } from '../SharedComponents/HomeComponents'

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Fish: false
        }
    }

    // toggles the fish at random intervals
    // Math.random() * (max - min) + min
    componentDidMount() {
        let rand = Math.random() * (10000 - 3000) + 3000
        let intervalId = setInterval(() => {
            this.setState(prevState => {
                if (prevState.Fish === true) {
                    return {
                        Fish: false
                    };
                } else {
                    return {
                        Fish: true
                    };
                }
            });

        }, rand);

        this.setState({
            intervalId
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }


    render() {
        return (
            <div>
                <AnimationsLayered speeds={[0.1]} animations={['happyBackground']} />
                <AnchorsModal />
                <PebblesModal />
                {(this.state.Fish) ? <div className='anim-2'><Animation animation='fish' /></div> : ''}
                <FishModal fishAppears={this.state.Fish} />
            </div>
        );
    }
}

export default HomePage;