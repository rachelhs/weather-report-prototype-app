import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from '../animations/sun.json'

class ForegroundAnimation extends Component {

  render(){

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return(
      <div>
      <Lottie options={defaultOptions}
      />
      </div>
    )
  }
}

export default ForegroundAnimation