// FILE CONTAINING COMPONENTS WHICH ARE SHARED ACROSS PATHS
import React from 'react';
import BackgroundAnimation from '../../components/Animations/BackgroundAnimation'
import ForegroundAnimation from '../../components/Animations/ForegroundAnimation'

// words
export class LowAcknowledgement extends React.Component {
    render() {
        let script = require('../../data/script.json');
        return (
            <h1 className="lowAcknowledge">{script[0].low[1]}</h1>
        )
    }
}

export class HowLongHaveYouFeltLikeThis extends React.Component {

  onHowLong = (howLong) => {
    console.log('button clicked');
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    let name = '';
    //get id for the current entry
    database.ref(`users/${uid}/entries`).orderByChild('createdAt').limitToLast(1).on('child_added', (snapshot) => {
        name = snapshot.key;
        database.ref(`users/${uid}/entries/${name}`).update({
        howLong: howLong
        })
    })
};

    render() {
        let script = require('../../data/script.json');
        return (
          <div>
            <h1 className='info-box-text'>{script[0].low[2]}</h1>
            <button className='next-button' onClick={() => this.onHowLong('today')}>today</button>
            <button className='next-button' onClick={() => this.onHowLong('a few days')}>a few days</button>
            <button className='next-button' onClick={() => this.onHowLong('a week')}>a week</button>
            <button className='next-button' onClick={() => this.onHowLong('longer')}>longer</button>
          </div>
        )
    }
}

// other components
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
        ? <span/>
        : <div className="fadeIn">{this.props.children}</div>;
    }
}
