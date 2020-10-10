import React from 'react';
import ReactModal from 'react-modal';
import firstAid from '../../images/first-aid-icon.svg';
import ReportPhoto from '../../images/weather-symbols-no-border/grey-cloud.png';
import { CSSTransition } from "react-transition-group";
const data = require('../../data/data.json');
const firebase = require('firebase/app');


export class Logout extends React.Component {
    startLogout() {
        firebase.auth().signOut();
    }
    render() {
        return (
            <div className='flex-center'>
                <button className="logout-button button--link" onClick={this.startLogout.bind(this)}>
                    <h1>Logout</h1></button>
            </div>
        )
    }
};

export class FirstAid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFirstAid: false,
            buttonsDisabled: true,
            showButtonDisabledMessage: false
        }
    }

    handleOpenModalFirstAid() { this.setState({ showFirstAid: true }) }
    handleCloseModalFirstAid() { this.setState({ showFirstAid: false }) }

    componentDidMount() {
        const url = window.location.pathname
        console.log(url)
        if (url === "/home" | url === "/3-home") {
            this.setState({ buttonsDisabled: false })
        }
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
                        <button className='first-aid-close' type="button" onClick={this.handleCloseModalFirstAid.bind(this)}>
                            CLOSE
                        </button>
                    </div>
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
                            <button  className='button-first-aid'><a className='text-first-aid' href="tel:0300-555-0334">MENTAL HEALTH CRISIS TEAM</a></button>
                        </div>
                    </div>
                    <div>
                        <h3 className="first-aid-title">{data[7].firstAid.questions.emergency}</h3>
                        <div className="flex-center">
                            <button  className='button-first-aid'><a className='text-first-aid' href="tel:999">CALL 999</a></button>
                        </div>
                    </div>
                </ReactModal>
            </span>
        )
    }
}

export class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        }
    }

    handleOpenModalMenu() { this.setState({ showMenu: true }) }
    handleCloseModalMenu() { this.setState({ showMenu: false }) }

    render() {
        const customStyles = {
            overlay: {zIndex: 1000}
        };
        return (
            <span>
                <button onClick={this.handleOpenModalMenu.bind(this)} className="button--link menu-text">MENU</button>
                <ReactModal style={customStyles} className='modalMenu' isOpen={this.state.showMenu} ariaHideApp={false}>
                    <div className="flex-center">
                        <button className='menu-close' type="button" onClick={this.handleCloseModalMenu.bind(this)}>
                            CLOSE
                        </button>
                    </div>

                    <h1>WHAT IS WEATHER REPORT?</h1>
                    <p>{data[11].menu.wrDescription}</p>
                    <h1>ACCESSIBILITY</h1>
                    <p>{data[11].menu.accessibility}</p>
                    <Logout />
                </ReactModal>
            </span>
        )
    }
}

export class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showReport: false,
        }
    }

    handleOpenModalReport() { this.setState({ showReport: true }) }
    handleCloseModalReport() { this.setState({ showReport: false }) }

    render() {
        const customStyles = {
            overlay: {zIndex: 1000}
        };
        return (
            <span>
                <button onClick={this.handleOpenModalReport.bind(this)} className="button--link menu-text">REPORT</button>
                <ReactModal style={customStyles} className='modalMenu' isOpen={this.state.showReport} ariaHideApp={false}>
                    <div className="flex-center">
                        <button className='menu-close' type="button" onClick={this.handleCloseModalReport.bind(this)}>
                            Back to Home
                        </button>
                    </div>

                    <h1>TODAY</h1>
                    <h3>21st September</h3>
                    <div className="flex-center">
                    <img src={ReportPhoto} alt="image of weather"></img>
                    </div>
                </ReactModal>
            </span>
        )
    }
}