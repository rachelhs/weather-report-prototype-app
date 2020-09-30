import React from 'react';
const data = require('../../data/data.json');
import ReactModal from 'react-modal';
import { SetExercises } from '../Exercises/SetExercises';
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { BackButtonFirstAid } from '../../actions/route-functions';

export class FirstAidPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalGrounding: false,
            showModalBreathing: false,
            showModalCrisis: false,
            showModalGP: false
        }
    }

    handleOpenModalGrounding() { this.setState({ showModalGrounding: true }) }
    handleCloseModalGrounding() { this.setState({ showModalGrounding: false }) }
    handleOpenModalBreathing() { this.setState({ showModalBreathing: true }) }
    handleCloseModalBreathing() { this.setState({ showModalBreathing: false }) }
    handleOpenModalCrisis() { this.setState({ showModalCrisis: true }) }
    handleCloseModalCrisis() { this.setState({ showModalCrisis: false }) }
    handleOpenModalGP() { this.setState({ showModalGP: true }) }
    handleCloseModalGP() { this.setState({ showModalGP: false }) }
    handleOpenModal999() { this.setState({ showModal999: true }) }
    handleCloseModal999() { this.setState({ showModal999: false }) }

    render() {
        // let history = useHistory()
        return (
            <div className='background-box-first-aid'>
                <div className="flex-center">
                    <BackButtonFirstAid/>
                </div>
                <div className="flex-center">
                    <div className="first-aid-buttonBig">
                        <div className="leftrightBig"></div>
                        <div className="rightleftBig"></div>
                    </div>
                </div>
                {/* <AnimationsLayered speeds={[0]} animations={['neutralBackground']} /> */}
                    {/* <CSSTransition in={this.state.showIntro} timeout={2000} classNames="fade" appear unmountOnExit onExited={() => this.reRoute()}> */}
                        <div>
                        <h3 className="first-aid-title">{data[7].firstAid.questions.exercise}</h3>
                            <div className="flex-center">
                                <button onClick={this.handleOpenModalGrounding.bind(this)} className='button-first-aid'>GROUNDING EXERCISE</button>
                            </div>
                            <ReactModal isOpen={this.state.showModalGrounding} ariaHideApp={false}>
                                <button onClick={this.handleCloseModalGrounding.bind(this)}>X</button>
                                {SetExercises('grounding')}
                            </ReactModal>
                            <div className="flex-center">
                            <button onClick={this.handleOpenModalBreathing.bind(this)} className='button-first-aid'>BREATHING EXERCISE</button>
                            </div>
                            <ReactModal isOpen={this.state.showModalBreathing} ariaHideApp={false}>
                                <button onClick={this.handleCloseModalBreathing.bind(this)}>X</button>
                                {SetExercises('breathing')}
                            </ReactModal>
                        </div>
                        <div>
                            <h3 className="first-aid-title">{data[7].firstAid.questions.professional}</h3>
                            <div className="flex-center">
                                <button onClick={this.handleOpenModalGP.bind(this)} className='button-first-aid'>YOUR GP</button>
                            </div>                           
                            <ReactModal isOpen={this.state.showModalGP} ariaHideApp={false}>
                                <div className="flex-center">
                                    <button onClick={this.handleCloseModalGP.bind(this)}>X</button>
                                </div>
                                <h1 className='info-box-title'>{data[7].firstAid.options.GP}</h1>
                            </ReactModal>
                                <div className="flex-center">
                                    <button onClick={this.handleOpenModalCrisis.bind(this)} className='button-first-aid'>MENTAL HEALTH CRISIS TEAM</button>
                                </div>
                            <ReactModal isOpen={this.state.showModalCrisis} ariaHideApp={false}>
                                <button onClick={this.handleCloseModalCrisis.bind(this)}>X</button>
                                <h1 className='info-box-title'>{data[7].firstAid.options.crisisTeam}</h1>
                            </ReactModal>
                        </div>
                        <div>
                            <h3 className="first-aid-title">{data[7].firstAid.questions.emergency}</h3>
                            <div className="flex-center">
                                <button onClick={this.handleOpenModal999.bind(this)} className='button-first-aid'>999</button>
                            </div>
                            <ReactModal isOpen={this.state.showModal999} ariaHideApp={false}>
                                <button onClick={this.handleCloseModal999.bind(this)}>X</button>
                                <h1 className='info-box-title'>{data[7].firstAid.options.ae}</h1>
                            </ReactModal>
                        </div>
                    {/* </CSSTransition> */}
                </div>
        
        )
    }
}

export default FirstAidPage;
