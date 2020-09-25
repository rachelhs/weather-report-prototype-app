import React from 'react';
import BackgroundAnimation from '../Animations/BackgroundAnimation'
import ForegroundAnimation from '../Animations/ForegroundAnimation'
const data = require('../../data/data.json');
const firebase = require('firebase/app');
import database from '../../firebase/firebase';

export class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isNewUser: true
        }
    }

    componentDidMount = () => {
        // checks if user is new by looking for weatherReports
        const uid = firebase.auth().currentUser.uid;
        console.log(uid);
        database.ref(`users/${uid}/weatherReports`).once("value", snapshot => {
            if (snapshot.exists()){
               console.log("user exists");
               this.setState({ isNewUser: false })
            }
        else {
            // if no weatherReports have been entered, user is taken down onboarding path
            console.log('new user')
            this.setState({ isNewUser: true })
            this.props.history.push('/onboarding');
        }})
    };

    onNext = () => {
        this.props.history.push('/choosesymbol');
    };

    render() {
        return (
            (this.state.isNewUser) ? '' : (<div className='background-box'>
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
            </div>)
        );
    }
}

export default LandingPage;
