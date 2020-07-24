import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { startGoogleLogin, startSignInAnonymously } from '../actions/auth'
import CreateUserForm from './CreateUserForm'
import LoginEmailForm from './LoginEmailForm'

export class LoginPage extends React.Component {
  state = {
    logInWithEmail: false,
    createUser: false
  }

  toggleStateParam (ev, param) {
    ev.preventDefault()
    this.setState((prevState) => {
      const state = {}
      state[param] = !prevState[param]

      return state
    })
  }

  startDemo = (ev) => {
    ev.preventDefault()
    startSignInAnonymously()
  }

  render () {
    const { startGoogleLogin } = this.props
    const { logInWithEmail, createUser } = this.state

    return (
      <div className='box-layout'>
        <div className='box-layout__box'>
          <h1 className='box-layout__title'>Expensify</h1>

          { !logInWithEmail && !createUser &&
            <div>
              <p>It's time to get your expenses under control.</p>
              <div className='box-layout__element'>
                <button className='button' onClick={startGoogleLogin}>Login with Google</button>
              </div>
              <div className='box-layout__element'>
                <button className='button' onClick={ev => this.toggleStateParam(ev, 'logInWithEmail')}>Login with Email</button>
              </div>
              <div className='box-layout__element'>
                <a href='#' onClick={ev => this.toggleStateParam(ev, 'createUser')}>Create account</a>
              </div>
            </div>
          }
          { logInWithEmail &&
            <LoginEmailForm
              goBackFunction={ev => this.toggleStateParam(ev, 'logInWithEmail')} />
          }
          { createUser &&
            <CreateUserForm
              goBackFunction={ev => this.toggleStateParam(ev, 'createUser')} />
          }
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  startGoogleLogin: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  startGoogleLogin: () => dispatch(startGoogleLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
