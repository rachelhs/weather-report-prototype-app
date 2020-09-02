const firebase = require('firebase/app');
import database from '../firebase/firebase';

import React, { useState } from 'react';
import BackgroundAnimation from '../components/Animations/BackgroundAnimation'
import ForegroundAnimation from '../components/Animations/ForegroundAnimation'

export function isLongerThanThreeDays(n) {

    // const [toggleHowLong, setToggleHowLong] = useState(0);

    // get timestamp for now
    const now = Date.now();
    // get timestamp for 3 days ago
    // 259200000 milliseconds
    const threeDaysAgo = now - 259200000;
    // has user updated mood in the previous 3 days?
    // retrieve entry before the current one
    const user = n
    const uid = user.uid;
    // return two most recent entries
    database.ref(`users/${uid}/entries`)
    .orderByChild('createdAt')
    .limitToLast(2)
    .on('value', (snapshot) => {
        snapshot.forEach((child) => {
            // if timestamp for either entry is older than 3 days
            let time = child.val().createdAt;
            console.log(time);
            if (time < threeDaysAgo) {
                this.setState({
                    toggleHowLong: true
                })
            }
        })
    })
}

export class AnimationsCombined extends React.Component {
    render() {
        return (
            <span>
                <div className='background-anim'>
                    <BackgroundAnimation />
                </div>
                <div className='foreground-anim'>
                    <ForegroundAnimation />
                </div>
            </span>
        )
    }
}

export class LowAcknowledgement extends React.Component {
    render() {
        let script = require('../data/script.json');
        return (
            <h1>{script[0].low[1]}</h1>
        )
    }
}

export class FadeOut extends React.Component {
    constructor(props) {
      super(props);
      this.state = {visible:true}
    }
  
    componentWillReceiveProps(nextProps) {
      // reset the timer if children are changed
      if (nextProps.children !== this.props.children) {
        this.setTimer();
        this.setState({visible: true});
      }
    }
  
    componentDidMount() {
      this.setTimer();
    }
  
    setTimer() {
      // clear any existing timer
      if (this._timer != null) {
        clearTimeout(this._timer)
      }
  
      // hide after `delay` milliseconds
      this._timer = setTimeout(function(){
        this.setState({visible: false});
        this._timer = null;
      }.bind(this), this.props.delay);
    }
  
    componentWillUnmount() {
      clearTimeout(this._timer);
    }
  
    render() {
      return this.state.visible
        ? <div>{this.props.children}</div>
        : <div className="fadeOut">{this.props.children}</div>;
    }
}

export class FadeIn extends React.Component {
    constructor(props) {
      super(props);
      this.state = {visible:true}
    }
  
    componentWillReceiveProps(nextProps) {
      // reset the timer if children are changed
      if (nextProps.children !== this.props.children) {
        this.setTimer();
        this.setState({visible: true});
      }
    }
  
    componentDidMount() {
      this.setTimer();
    }
  
    setTimer() {
      // clear any existing timer
      if (this._timer != null) {
        clearTimeout(this._timer)
      }
  
      // hide after `delay` milliseconds
      this._timer = setTimeout(function(){
        this.setState({visible: false});
        this._timer = null;
      }.bind(this), this.props.delay);
    }
  
    componentWillUnmount() {
      clearTimeout(this._timer);
    }
  
    render() {
      return this.state.visible
        ? <span />
        : <div className="fadeIn">{this.props.children}</div>;
    }
}
