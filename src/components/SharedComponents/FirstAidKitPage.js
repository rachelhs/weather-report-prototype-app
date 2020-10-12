const data = require('../../data/data.json');
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactModal from 'react-modal';
import firstAid from '../../images/first-aid-icon.svg';

export class FirstAidKitPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFirstAid: true,
            buttonsDisabled: true,
            showButtonDisabledMessage: false,
            mobile: true,
            showCrisisNumber: false,
            crisisText: 'MENTAL HEALTH CRISIS TEAM'
        }
        this.toggleCrisisNumber = this.toggleCrisisNumber.bind(this);
    }

    handleOpenModalFirstAid() { this.setState({ showFirstAid: true }) }
    handleCloseModalFirstAid() { this.setState({ showFirstAid: false }) }

    componentDidMount() {
        const url = window.location.pathname
        console.log(url)
        if (url === "/home" | url === "/3-home") {
            this.setState({ buttonsDisabled: false })
        }
    this.isMobileCheck();
    }

    // checks if user is using a mobile
    isMobileCheck() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        this.setState({ mobile: isMobile });
    }

    clickGrounding() {
        if(this.state.buttonsDisabled){
            this.setState({ showButtonDisabledMessage: true })
        }
    }

    clickBreathing() {
        if(this.state.buttonsDisabled){
            this.setState({ showButtonDisabledMessage: true })
        } else {
            this.props.history.push({
                pathname: '/breathing-exercise',
            })
        }
    }

    toggleCrisisNumber() {
        this.setState({ showCrisisNumber: !this.state.showCrisisNumber })
        console.log(this.state.showCrisisNumber);
        if(this.state.showCrisisNumber) {
            this.setState({ crisisText: 'MENTAL HEALTH CRISIS TEAM' })
        }
        else {
            this.setState({ crisisText: '0300-555-0334' })
        }
    }

    render() {
        const customStyles = {
            overlay: {zIndex: 1000}
        };
        return (
            <span>
                <button
                    onClick={this.handleOpenModalFirstAid.bind(this)}
                    className='first-aid-button button--link'>
                        <img src={firstAid} alt="first-aid-symbol"/>
                </button>
                <ReactModal style={customStyles} className='modalFirstAid' isOpen={this.state.showFirstAid} ariaHideApp={false}>
                    <div className="flex-center">
                        <img src={firstAid} alt="first-aid-symbol" width="100px"/>
                    </div>
                    <div>
                        <h3 className="first-aid-title">{data[7].firstAid.questions.exercise}</h3>
                            <div className="flex-center">
                                <button onClick={this.clickGrounding.bind(this)} className={this.state.buttonsDisabled ? 'exerciseDisabled button-first-aid' : 'button-first-aid'}>GROUNDING EXERCISE</button>
                            </div>
                            <div className="flex-center">
                            <button onClick={this.clickBreathing.bind(this)} className={this.state.buttonsDisabled ? 'exerciseDisabled button-first-aid' : 'button-first-aid'}>BREATHING EXERCISE</button>
                            </div>
                            <CSSTransition in={this.state.showButtonDisabledMessage} timeout={2000} classNames="fade" appear unmountOnExit>
                                <p className="flex-center exerciseMessage">You can access these exercises from the home screen</p>
                            </CSSTransition>
                    </div>
                    <div>
                        <h3 className="first-aid-title">{data[7].firstAid.questions.professional}</h3>
                        <div className="flex-center">
                            <button className='button-first-aid'><a className='text-first-aid' target="_blank" href="https://www.nhs.uk/service-search/find-a-gp">YOUR GP</a></button>
                        </div>                          
                        <div className="flex-center">    
                        {(this.state.mobile) ?<button  className='button-first-aid'><a className='text-first-aid' href="tel:0300-555-0334">MENTAL HEALTH CRISIS TEAM</a></button>:
                        <button className='button-first-aid' onClick={this.toggleCrisisNumber}><a className='text-first-aid'>{this.state.crisisText}</a></button>}
                        </div>
                    </div>
                    <div>
                        <h3 className="first-aid-title">{data[7].firstAid.questions.emergency}</h3>
                        <div className="flex-center">
                            {(this.state.mobile) ? <button className='button-first-aid'><a className='text-first-aid' href="tel:999">CALL 999</a></button>:
                            <button className="button-first-aid browser-first-aid">CALL 999</button>}
                        </div>
                    </div>
                </ReactModal>
            </span>
        )
    }
}