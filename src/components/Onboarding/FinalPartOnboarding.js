import React from 'react'
import { TextWithNext } from '../SharedComponents/SharedComponents'
import { CSSTransition } from "react-transition-group";
import Header from '../Header';

export class FinalPartOnboarding extends React.Component {
    render() {
        return (
            <div>
            <CSSTransition in={this.state.report} timeout={fadeTime} classNames="fade" unmountOnExit appear><div><Header /><div className='info-box'><TextWithNext text={data[9].onboarding.report} onClick={this.goToRoute.bind(this)} /></div></div></CSSTransition>
            </div>
        );
    }
} 