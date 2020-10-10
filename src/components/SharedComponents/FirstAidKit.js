// FILE CONTAINING COMPONENTS WHICH ARE SHARED ACROSS PATHS
const data = require('../../data/data.json');
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactModal from 'react-modal';
import { SetExercises } from '../Exercises/SetExercises';
import { AllRoots } from '../SharedComponents/SharedComponents';

// First Aid Kit
export class FirstAidKit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showQuestions: true,
            showModalGrounding: false,
            showModal999: false,
            showModalCrisis: false,
            showModalRoots: false,
            showModalGP: false
        }

        this.handleOpenModalGrounding = this.handleOpenModalGrounding.bind(this);
        this.handleCloseModalGrounding = this.handleCloseModalGrounding.bind(this);
        this.handleOpenModal999 = this.handleOpenModal999.bind(this);
        this.handleCloseModal999 = this.handleCloseModal999.bind(this);
        this.handleOpenModalCrisis = this.handleOpenModalCrisis.bind(this);
        this.handleCloseModalCrisis = this.handleCloseModalCrisis.bind(this);
        this.handleOpenModalRoots = this.handleOpenModalRoots.bind(this);
        this.handleCloseModalRoots = this.handleCloseModalRoots.bind(this);
        this.handleOpenModalGP = this.handleOpenModalGP.bind(this);
        this.handleCloseModalGP = this.handleCloseModalGP.bind(this);
    }

    handleOpenModalGrounding() {
        this.setState({ showModalGrounding: true });
    }

    handleCloseModalGrounding() {
        this.setState({ showModalGrounding: false });
    }

    handleOpenModalRoots() {
        this.setState({ showModalRoots: true });
    }

    handleCloseModalRoots() {
        this.setState({ showModalRoots: false });
    }

    handleOpenModal999() {
        this.setState({ showModal999: true });
    }

    handleCloseModal999() {
        this.setState({ showModal999: false });
    }

    handleOpenModalCrisis() {
        this.setState({ showModalCrisis: true });
    }

    handleCloseModalCrisis() {
        this.setState({ showModalCrisis: false });
    }

    handleOpenModalGP() {
        this.setState({ showModalCrisis: true });
    }

    handleCloseModalGP() {
        this.setState({ showModalCrisis: false });
    }

    componentDidMount() {
        // set timeout for prompts
        setTimeout(() => { this.setState({ showQuestions: false }) }, 3000)
    }

    showOptions() {
        this.setState({
            showQuestions: false,
            showOptions: true
        })
    }

    render() {
        return (
            <div>
                <CSSTransition in={this.state.showQuestions} timeout={2000} classNames="fade" unmountOnExit appear onExited={() => this.showOptions()}>
                    <div><h1 className='info-box-title'>{data[7].firstAid.questions.help}</h1><h1 className='info-box-title'>{data[7].firstAid.questions.need}</h1></div></CSSTransition>
                <CSSTransition in={this.state.showOptions} timeout={2000} classNames="fade" unmountOnExit>
                    <div className='button-container-vertical'>
                        <button onClick={this.handleOpenModalGrounding} className='transparent-button'>Grounding Exercise</button>
                        <button onClick={this.handleOpenModalRoots} className='transparent-button'>Reach out to Supporters / Roots</button>
                        <button onClick={this.handleOpenModalGP} className='transparent-button'>Reach out to GP / Support Worker</button>
                        <button onClick={this.handleOpenModalCrisis} className='transparent-button'>Call Bristol Mental Health Crisis Team: 0300 555 0334</button>
                        <button onClick={this.handleOpenModal999} className='transparent-button'>Ring 999 or go to A & E</button>

                        <ReactModal
                            isOpen={this.state.showModalGrounding}
                            ariaHideApp={false}
                        >
                            <button onClick={this.handleCloseModalGrounding}>X</button>
                            {SetExercises('grounding')}
                        </ReactModal>

                        <ReactModal
                            isOpen={this.state.showModalRoots}
                            ariaHideApp={false}
                        >
                            <button onClick={this.handleCloseModalRoots}>X</button>
                            <AllRoots />
                        </ReactModal>

                        <ReactModal
                            isOpen={this.state.showModalGP}
                            ariaHideApp={false}
                        >
                            <button onClick={this.handleCloseModalGP}>X</button>
                            <h1 className='info-box-title'>{data[7].firstAid.options.GP}</h1>
                        </ReactModal>

                        <ReactModal
                            isOpen={this.state.showModalCrisis}
                            ariaHideApp={false}
                        >
                            <button onClick={this.handleCloseModalCrisis}>X</button>
                            <h1 className='info-box-title'>{data[7].firstAid.options.crisisTeam}</h1>
                        </ReactModal>

                        <ReactModal
                            isOpen={this.state.showModal999}
                            ariaHideApp={false}
                        >
                            <button onClick={this.handleCloseModal999}>X</button>
                            <h1 className='info-box-title'>{data[7].firstAid.options.ae}</h1>
                        </ReactModal>

                    </div>
                </CSSTransition>
            </div>
        )
    }
}