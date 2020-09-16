import React from 'react'
import { connect } from 'react-redux'
import { startEmailLogin } from '../../actions/auth'
import PropTypes from 'prop-types'
import ForegroundAnimation from '../Animations/ForegroundAnimation'
import '../../styles/components/_button.scss';
import { CSSTransition } from "react-transition-group";
import '../../styles/animation.css';

export class LoginEmailForm extends React.Component {
  state = {
    error: false,
    loading: false,
    email: '',
    password: '',
    isPasswordShown: false,
    appIntro: true,
    showLogin: null,
  }

    componentDidMount() { 
        setTimeout( () => { this.setState({ appIntro: false }) }, 3000)
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

  render () {
    const { isPasswordShown } = this.state;
    const { error, loading } = this.state
    const { goBackFunction } = this.props

    return (
        // <div className='box-layout'>
        //     <div className='box-layout__box'>
            <div className='background-box'>
                <div className='background-anim'>
                    <ForegroundAnimation />
                </div>

                <div className='info-box-login'>
                    <CSSTransition in={this.state.appIntro} timeout={1500} classNames="transform-up" appear onExited={() => this.showLoginForm()}>
                        <h1 className='box-layout__title'>WEATHER REPORT</h1>
                    </CSSTransition>

                    <CSSTransition in={this.state.showLogin} timeout={1000} classNames="fade-fast" unmountOnExit>

                        <form className='form' onSubmit={this.onFormSubmit}>
                            <div class="wrap-input100">
                                <input
                                    onChange={(ev) => this.setStateProperty(ev.target.value, 'email')}
                                    placeholder='Username*'
                                    aria-label='Email'
                                    type='text'
                                    name='email'
                                    required = '*Required'
                                    oninput="this.setCustomValidity('')" 
                                    oninvalid="alert('You must fill out the form!');"
                                    className='form-input'
                                />
                            </div>
                            <div class="wrap-input100 validate-input">
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
                                { loading ? 'Loading..' : 'LOGIN' }
                            </button>
                            { goBackFunction &&
                            <button className='button button--secondary' onClick={goBackFunction}>Cancel</button> }
                        </form>
                    </CSSTransition>
                </div>
         </div>
    )
  }
}

LoginEmailForm.propTypes = {
  startEmailLogin: PropTypes.func,
  goBackFunction: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  startEmailLogin: (emai, password) => dispatch(startEmailLogin(emai, password))
})

export default connect(undefined, mapDispatchToProps)(LoginEmailForm)
