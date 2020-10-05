import React from 'react';
import { AnimationsLayered } from '../SharedComponents/SharedComponents'
import Animation from '../../components/Animations/Animation'
import { FishModal, AnchorsModal, PebblesModal } from '../SharedComponents/HomeComponents'

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Fish: false,
            weather: null
        }
    }

    // toggles the fish at random intervals
    // Math.random() * (max - min) + min
    componentDidMount() {
        if (typeof this.props.location.state != 'undefined' || this.props.location.state != null) {
            console.log('emotional background')
            this.setState({ weather: this.props.location.state.weather })
        } else {
            this.setState({ weather: "neutralBackground" })
        }
        const rand = Math.random() * (30000 - 15000) + 15000
        let intervalId = setInterval(() => {
            this.setState(prevState => {
                if (prevState.Fish === true) {
                    return {
                        Fish: false
                    };
                } else {
                    return {
                        Fish: true,
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
        console.log('fish', this.state.Fish);

        return (
            <div>
                <AnimationsLayered speeds={[1]} animations={[this.state.weather]} />
                <AnchorsModal />
                <PebblesModal />
                {(this.state.Fish) ? 
                <div className='anim-2'><Animation animation='fishSwimming'/></div>
                : ''}                
                <FishModal fishAppears={this.state.Fish} />
            </div>
        );
    }
}

export default HomePage;