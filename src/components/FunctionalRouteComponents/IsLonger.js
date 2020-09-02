const firebase = require('firebase/app');
import database from '../../firebase/firebase';
import React from 'react';
import { FadeIn } from '../../actions/route-functions'

export class IsLonger extends React.Component {
    constructor(props) {
      super(props);
      this.state = {LongerThanThree:"start"}
      this.IsLongerThanThreeDays = this.IsLongerThanThreeDays.bind(this);
      this.onNext = this.onNext.bind(this);
    }
  
    componentDidMount() {
        this.IsLongerThanThreeDays();
    }

    IsLongerThanThreeDays = () => {
        // get timestamp for now
        const now = Date.now();
        // get timestamp for 3 days ago
        // 259200000 milliseconds in 3 days
        const threeDaysAgo = now - 259200000;
        // has user updated mood in the previous 3 days?
        // retrieve entry before the current one
        const user = this.props.user;
        const uid = user.uid;
        // return two most recent entries
        database.ref(`users/${uid}/entries`)
            .orderByChild('createdAt')
            .limitToLast(2)
            .on('value', (snapshot) => {
                snapshot.forEach((child) => {
                    // if timestamp for either entry is older than 3 days
                    let time = child.val().createdAt;
                    console.log('time', time);
                    if (time < threeDaysAgo) {
                        this.setState({ LongerThanThree: "true" });
                    } else {
                        this.setState({ LongerThanThree: "false" });
                    }
                })
            })
            // console.log('state', this.state.LongerThanThree )
        }

    render() {
        let script = require('../../data/script.json');
      return (
        <FadeIn delay={5000}>
            {this.state.toggleHowLong ? (
            <div className='info-box'>
                <h1>{script[0].low[2]}</h1>
                <button className='next-button' onClick={this.onNext}>next</button>
            </div>
            ) : (
            <div className='info-box'>
                <h1>{script[0].low[3]}</h1>
                <button className='next-button' onClick={this.onNext}>next</button>
            </div>
            )}
        </FadeIn>
      )
    }
}