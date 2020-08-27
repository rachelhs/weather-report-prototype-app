import React from 'react'
import { connect } from 'react-redux'
import { startEmailLogin } from '../../actions/auth'
import PropTypes from 'prop-types'

export class LoginEmailForm extends React.Component {
  state = {
    error: false,
    loading: false,
    email: '',
    password: ''
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

  render () {
    const { error, loading } = this.state
    const { goBackFunction } = this.props

    return (
      <div className='box-layout'>
      <div className='box-layout__box'>
      <h1 className='box-layout__title'>Weather Report</h1>
        <form className='form' onSubmit={this.onFormSubmit}>
          <input
            onChange={(ev) => this.setStateProperty(ev.target.value, 'email')}
            placeholder='Username'
            aria-label='Email'
            type='text'
            name='email'
            required
            className='text-input' />
          <input
            onChange={(ev) => this.setStateProperty(ev.target.value, 'password')}
            placeholder='Password'
            aria-label='Password'
            type='password'
            name='password'
            required
            className='text-input' />
          { error && <p className='form__error'>{error}</p> }
          <button type='submit' className='button' disabled={loading}>
            { loading ? 'Loading..' : 'Login' }
          </button>
          { goBackFunction &&
            <button className='button button--secondary' onClick={goBackFunction}>Cancel</button> }
        </form>
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
