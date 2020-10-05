import React from 'react';
import { AnimationsLayered } from '../SharedComponents/SharedComponents';
import { CSSTransition } from "react-transition-group";


export class Report extends React.Component {
    render() {
        return (
            <div className='background-box'>
                <AnimationsLayered speeds={[0]} animations={['neutralBackground']} />
                <div className='info-box-low'>
                    <CSSTransition in={this.state.showIntro} timeout={2000} classNames="fade" appear unmountOnExit>
                        <div>
                            <h1>Report</h1>
                        </div>
                    </CSSTransition>

                    
                </div>
            </div>
        
        )
    }
}

export default Report;
