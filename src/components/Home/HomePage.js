import React from 'react';
import { AnimationsLayered } from '../SharedComponents/SharedComponents'
import Animation from '../../components/Animations/Animation'
import ReactModal from 'react-modal';
import AllGratitudes from '../SharedComponents/HomeComponents'

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Fish: false,
            showModalFish: false,
            showModalPlant: false,
            showModalPebble: false,
            modalOpen: false
        }
        this.handleOpenModalFish = this.handleOpenModalFish.bind(this);
        this.handleCloseModalFish = this.handleCloseModalFish.bind(this);
        this.handleOpenModalPlant = this.handleOpenModalPlant.bind(this);
        this.handleCloseModalPlant = this.handleCloseModalPlant.bind(this);
        this.handleOpenModalPebble = this.handleOpenModalPebble.bind(this);
        this.handleCloseModalPebble = this.handleCloseModalPebble.bind(this);
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

    // opens and closes the modals
    handleOpenModalFish() {
        this.setState({
            showModalFish: true,
            modalOpen: true
        });
    }

    handleCloseModalFish() {
        this.setState({
            showModalFish: false,
            modalOpen: false
        });
    }

    handleOpenModalPlant() {
        this.setState({
            showModalPlant: true,
            modalOpen: true
        });
    }

    handleCloseModalPlant() {
        this.setState({
            showModalPlant: false,
            modalOpen: false
        });
    }

    handleOpenModalPebble() {
        this.setState({
            showModalPebble: true,
            modalOpen: true
        });
    }

    handleCloseModalPebble() {
        this.setState({
            showModalPebble: false,
            modalOpen: false
        });
    }

    render() {
        return (
            <div>
                <AnimationsLayered animations={['happyBackground']} />
                {this.state.modalOpen ? '' : <button onClick={this.handleOpenModalPlant} className='clickablePlant'></button>}
                {this.state.modalOpen ? '' : <button onClick={this.handleOpenModalPebble} className='clickablePebble'></button>}
                {(this.state.Fish && this.state.modalOpen) ? '' : <div className='anim-2'><button onClick={this.handleOpenModalFish} className='clickableFish'></button>
                    <Animation animation='fish' /></div>}

                <ReactModal
                    className='modal'
                    isOpen={this.state.showModalFish}
                    ariaHideApp={false}
                >
                    <AllGratitudes />
                    <button className='modalButton' onClick={this.handleCloseModalFish}>X</button>
                </ReactModal>

                <ReactModal
                    className='modal'
                    isOpen={this.state.showModalPlant}
                    ariaHideApp={false}
                >
                    <button onClick={this.handleCloseModalPlant}>X</button>
                    <h1>plant modal</h1>
                </ReactModal>

                <ReactModal
                    className='modal'
                    isOpen={this.state.showModalPebble}
                    ariaHideApp={false}
                >
                    <button onClick={this.handleCloseModalPebble}>X</button>
                    <h1>pebble modal</h1>
                </ReactModal>

            </div>
        );
    }
}

export default HomePage;