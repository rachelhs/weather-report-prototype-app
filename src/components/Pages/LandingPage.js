import React from 'react';
import BackgroundAnimation from '../Animations/BackgroundAnimation'
import ForegroundAnimation from '../Animations/ForegroundAnimation'
const data = require('../../data/data.json');
const firebase = require('firebase/app');
import database from '../../firebase/firebase';
import moment from 'moment';
import { history } from '../../routers/AppRouter';


export class LandingPage extends React.Component {
    state = {
        showContent: false
    }
    
    componentDidMount = () => {
        const date = moment().format("DD-MM-YYYY");
        const uid = firebase.auth().currentUser.uid;
        // check if they have entered WR more 
        let entries = database.ref(`users/${uid}/weatherReports/${date}`);
        entries.on('value', function(snapshot) {
            const numberOfEntries = snapshot.numChildren()
            console.log('how many entries', snapshot.numChildren())
            if (numberOfEntries >= 3) {
                history.push('/3-home');
            }
        });
        database.ref(`users/${uid}/weatherReports`).once("value", snapshot => {
            // if user exists show 'no
            if (snapshot.exists()){
               this.setState({ showContent: true })
            }
        else {
            // if no weatherReports have been entered, user is taken down onboarding path
            history.push('/onboarding');
        }})
    };

    onNext = () => {
        this.props.history.push('/choosesymbol');
    };

    render() {
        
        return (
            (this.state.showContent) ?
            (
            <div className='background-box'>
                <div className='background-anim'>
                    <BackgroundAnimation />
                </div>
                <div className='foreground-anim'>
                    <ForegroundAnimation />
                </div>
                <div className='info-box-landing'>
                    <h1 className='info-box-text-padding-top'>{ data[0].regularLogin[1] }</h1>
                    <div className="button-container">
                        <button className='next-button' onClick={this.onNext}>NEXT</button>
                    </div>
                </div>
            </div>
            ) 
            : 
            (
            <div className='background-box'>
                <div className='background-anim'>
                    <BackgroundAnimation />
                </div>
                <div className='foreground-anim'>
                    <ForegroundAnimation />
                </div>
            </div>
            ) 
        )
    }
}

export default LandingPage;
