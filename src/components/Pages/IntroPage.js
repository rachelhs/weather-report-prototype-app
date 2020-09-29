import React from 'react';
const data = require('../../data/data.json');
const firebase = require('firebase/app');
import database from '../../firebase/firebase';
import moment from 'moment';
import { history } from '../../routers/AppRouter';
import { AnimationsLayered } from '../SharedComponents/SharedComponents';
import { CSSTransition } from "react-transition-group";


export class IntroPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showIntro: true
        }
    }

    componentDidMount = () => {
        setTimeout(() => { this.setState({ showIntro: false })}, 2000)
    };

    reRoute() {
        const date = moment().format("DD-MM-YYYY");
        const uid = firebase.auth().currentUser.uid;        // check if they have entered WR more 
        let entries = database.ref(`users/${uid}/weatherReports/${date}`);
        entries.on('value', function(snapshot) {
            const numberOfEntries = snapshot.numChildren()
            console.log('how many entries', snapshot.numChildren())
            if (numberOfEntries >= 3) {
                history.push('/3-home');
            }
            else {
                database.ref(`users/${uid}/weatherReports`).once("value", snapshot => {
                    // if user exists show 'no
                    if (snapshot.exists()){
                        history.push('/landing');
                    }
                    else {
                        // if no weatherReports have been entered, user is taken down onboarding path
                        history.push('/onboarding');
                    }
                })
            }
        });
        

    }

    render() {
        return (
            <div className='background-box'>
                <AnimationsLayered speeds={[0]} animations={['neutralBackground']} />
                <div className='info-box-landing'>
                    <CSSTransition in={this.state.showIntro} timeout={2000} classNames="fade" appear unmountOnExit onExited={() => this.reRoute()}>
                        <h1 className='info-box-text-padding-top'>Welcome to the Weather Report</h1>
                    </CSSTransition>

                    
                </div>
            </div>
        
        )
    }
}

export default IntroPage;
