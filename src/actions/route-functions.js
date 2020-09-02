import React, { useState } from 'react';
import BackgroundAnimation from '../components/Animations/BackgroundAnimation'
import ForegroundAnimation from '../components/Animations/ForegroundAnimation'
const firebase = require('firebase/app');
import database from '../firebase/firebase';


export async function isLongerThanThreeDays(n) {
    // get timestamp for now
    const now = Date.now();
    // get timestamp for 3 days ago (259200000 milliseconds)
    const threeDaysAgo = now - 259200000;
    console.log('3 days', threeDaysAgo)
    // has user updated mood in the previous 3 days? - retrieve entry before the current one
    const uid = n.uid;
    // return two most recent entries
    await database.ref(`users/${uid}/entries`)
    .orderByChild('createdAt')
    .limitToLast(2)
    .on('value', (snapshot) => {
        snapshot.forEach((child) => {
            let time = child.val().createdAt;
            let isLonger = '';
            console.log(time);
            if (time < threeDaysAgo) {
                console.log('true')
                //return Promise.resolve("less than threeDaysAgo");
                isLonger = "less than"
            }
            else {
                console.log('false')
                //return Promise.resolve("more than threeDaysAgo");
                isLonger = "more than"
            }
        })
    })
    let result = await isLonger;
    return result;
}


export function doSomething(num) {
    if (num > 1) {
        return "bigger than one"
    } else {
        return "smaller than one"
    }
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
