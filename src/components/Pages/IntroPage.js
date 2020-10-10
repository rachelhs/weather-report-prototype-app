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
            <div className='container'>
                    <CSSTransition in={this.state.showIntro} timeout={2000} classNames="fade" appear unmountOnExit onExited={() => this.reRoute()}>
                        <div className="center-vertical">
                            <h1>Weather Report</h1>
                        </div>
                    </CSSTransition>
            </div>
        
        )
    }
}

export default IntroPage;
