import React from 'react';
import { AnimationsLayered } from '../SharedComponents/SharedComponents'
import Animation from '../../components/Animations/Animation'
import { FishModal, AnchorsModal, PebblesModal } from '../SharedComponents/HomeComponents'

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Fish: false,
            weather: this.props.location.state ? this.props.location.state.weather : 'neutralBackground',
            showButton: false
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


    render() {
        console.log('fish', this.state.Fish);
        console.log('show button', this.state.showButton)
        return (
            <div>
                <AnimationsLayered speeds={[0.4]} animations={[this.state.weather]} />
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