import React from 'react'
import { connect } from 'react-redux'
import { startEmailLogin } from '../../actions/auth'
import PropTypes from 'prop-types'
import '../../styles/components/_button.scss';
import { CSSTransition } from "react-transition-group";
import '../../styles/animation.css';
import Animation from '../Animations/Animation'

export class LoginEmailForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    error: false,
    loading: false,
    email: '',
    password: '',
    isPasswordShown: false,
    appIntro: true,
    showLogin: null,
    showEnterEmail: false
  }
this.passwordReset = this.passwordReset.bind(this);
this.triggerTimeout = this.triggerTimeout.bind(this);
}

triggerTimeout(itemToFadeOut) {
  const fadeTime = 3000;
  setTimeout(() => { this.setState({ [itemToFadeOut]: false }) }, fadeTime)
}

  setStateProperty = (value, property) => {
    this.setState(() => {
      const state = {}
      state[property] = value
      return state
    })
  }

  onFormSubmit = (ev) => {
    ev.preventDefault()
    const { email, password } = this.state
    this.setState(() => ({ loading: true }))

    this.props.startEmailLogin(email, password).catch((fail) => {
      const error = 'Invalid email and/or password.'
      this.setState(() => ({ error, loading: false }))
    })
  }

  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  showLoginForm = () => {
    this.setState({ showLogin: true });
  }

  passwordReset = (email) => () => {
    if(email == ''){
      this.setState({ showEnterEmail: true });
    }
    else {
    return firebase.auth().sendPasswordResetEmail(email);
    }
}

  render () {
    const { isPasswordShown } = this.state;
    const { error, loading } = this.state
    const { goBackFunction } = this.props

    return (
      <div className='background-box'>
            <div className="background-box"></div>
            <div className='anim-full-height'><Animation speed={0.2} animation={"neutralNoTrees"} /></div>
            <div className='info-box-login'>
                <CSSTransition in={this.state.appIntro} timeout={1000} classNames="transform-up" appear onEntered={() => { this.triggerTimeout('appIntro') }} onExited={() => this.showLoginForm()}>
                    <h2 className='box-layout__title'><b>WEATHER REPORT</b></h2>
                </CSSTransition>
                <CSSTransition in={this.state.showLogin} timeout={1000} classNames="fade-fast" unmountOnExit>
                    <div>
                        <form className='form' onSubmit={this.onFormSubmit}>
                            <div className="wrap-input100">
                                <input
                                    onChange={(ev) => this.setStateProperty(ev.target.value, 'email')}
                                    placeholder='Username*'
                                    aria-label='Email'
                                    type='text'
                                    name='email'
                                    required = '*Required'
                                    className='form-input'
                                />
                            </div>
                            <div className="wrap-input100 validate-input">
                                <input
                                    onChange={(ev) => this.setStateProperty(ev.target.value, 'password')}
                                    placeholder='Password*'
                                    aria-label='Password'
                                    type={isPasswordShown ? "text" : "password"}
                                    name='password'
                                    required = '*Required'
                                    className='form-input validate-input'
                                />
                                <i
                                    className={isPasswordShown ? "fas fa-eye-slash password-icon" : "fas fa-eye password-icon"}
                                    onClick={this.togglePasswordVisiblity}
                                />
                            </div>
                            { error && <p className='form__error'>{error}</p> }
                            <button type='submit' className='button login-button' disabled={loading}>
                                { loading ? '...' : 'NEXT' }
                            </button>
                            { goBackFunction &&
                            <button className='button button--secondary' onClick={goBackFunction}>Cancel</button> }
                        </form>
                        {<button className='button button--password-reset' onClick={this.passwordReset(this.state.email)}>Forgot Password?</button>}  
                        {(this.state.showEnterEmail) ? <p className="form__error">Please enter e-mail address then click Forgot Password</p> : ''}
                        </div>
                </CSSTransition>
            </div>
        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startEmailLogin: (emai, password) => dispatch(startEmailLogin(emai, password))
})

export default connect(undefined, mapDispatchToProps)(LoginEmailForm)
