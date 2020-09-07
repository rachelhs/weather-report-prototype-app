import React, {Component} from 'react';
import cx from 'classnames';
import './index.css';
import {CSSTransition} from 'react-transition-group';

class AnimationPractise extends Component {
  state = {
    display: true,
  };

  toggle = () => {
    this.setState(prevstate => ({
      display: !prevstate.display,
    }));
  };
  
  render() {
    return (
      <div className="container">
        <button 
          className={cx('toggler', {
            'toggler--active': this.state.display,
          })}
          onClick={this.toggle}>Show</button>
        <CSSTransition
            in={this.state.display}
            timeout={350}
            classNames="display"
            unmountOnExit
            appear
            >
            <div className="menu">
                <ul className="list">
                <li className="list-item">Rajat</li>
                <li className="list-item">Writes about React</li>
                <li className="list-item">Loves Pizza</li>
                </ul>
            </div>
            </CSSTransition>
      </div>
    )
  }
}

export default AnimationPractise;