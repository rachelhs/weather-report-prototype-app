import React from 'react';
import { AnimationsLayered } from '../SharedComponents/SharedComponents'
import Animation from '../../components/Animations/Animation'
import ReactModal from 'react-modal';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Fish: false,
            showModalFish: false,
            showModalPlant: false,
            showModalPebble: false
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
        this.setState({ showModalFish: true });
    }

    handleCloseModalFish() {
        this.setState({ showModalFish: false });
    }

    handleOpenModalPlant() {
        this.setState({ showModalPlant: true });
    }

    handleCloseModalPlant() {
        this.setState({ showModalPlant: false });
    }

    handleOpenModalPebble() {
        this.setState({ showModalPebble: true });
    }

    handleCloseModalPebble() {
        this.setState({ showModalPebble: false });
    }

    render() {
        return (
            <div>
                <AnimationsLayered animations={['happyBackground']} />
                <button onClick={this.handleOpenModalPlant} className='clickablePlant'></button>
                <button onClick={this.handleOpenModalPebble} className='clickablePebble'></button>
                {this.state.Fish && <div className='anim-2'><button onClick={this.handleOpenModalFish} className='clickableFish'></button>
                    <Animation animation='fish' /></div>}

                <ReactModal
                    isOpen={this.state.showModalFish}
                    ariaHideApp={false}
                >
                    <button onClick={this.handleCloseModalFish}>X</button>
                    <h1>fish modal</h1>
                </ReactModal>

                <ReactModal
                    isOpen={this.state.showModalPlant}
                    ariaHideApp={false}
                >
                    <button onClick={this.handleCloseModalPlant}>X</button>
                    <h1>plant modal</h1>
                </ReactModal>

                <ReactModal
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