import React from 'react'
import { connect } from 'react-redux'
import { startCreateUser } from '../actions/auth'
import PropTypes from 'prop-types'

export class CreateUserForm extends React.Component {
  state = {
    error: false,
    loading: false,
    email: '',
    confirmEmail: false,
    password: ''
  }

  setStateProperty = (value, property) => {
    this.setState(() => {
      const state = {}
      state[property] = value
      return state
    })
  }

  isEmail = (email) =>
    /(.+)@(.+){2,}\.(.+){2,}/.test(email)

  isPassword = (password) =>
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,8}$/.test(password)

  onFormSubmit = (ev) => {
    ev.preventDefault()
    const { email, confirmEmail, password } = this.state

    if (!this.isEmail(email)) {
      this.setState(() => ({ error: 'Invalid email address.' }))
      return
    }

    if (email !== confirmEmail) {
      this.setState(() => ({ error: 'Please, confirm your email.' }))
      return
    }

    if (!this.isPassword(password)) {
      this.setState(() => ({ error: 'Password must be min 6 characters and max 8 characters. Must include one upper case letter, one lower case letter, and one numeric digit.' }))
      return
    }

    this.setState(() => ({ loading: true }))
    this.props.startCreateUser(email, password).catch((fail) => {
      const error = fail.code === 'auth/email-already-in-use'
        ? fail.message
        : 'Fail to create account.'

      this.setState(() => ({ error, loading: false }))
    })
  }

  render () {
    const { error, loading } = this.state
    const { goBackFunction } = this.props

    return (
      <div>
        <p>Create your account.</p>
        <form className='form' onSubmit={this.onFormSubmit}>
          <input
            onChange={(ev) => this.setStateProperty(ev.target.value, 'email')}
            placeholder='Email'
            aria-label='Email'
            type='text'
            name='email'
            required
            className='text-input' />
          <input
            onChange={(ev) => this.setStateProperty(ev.target.value, 'confirmEmail')}
            placeholder='Confirm Email'
            aria-label='Confirm Email'
            type='text'
            name='confirm-email'
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
            { loading ? 'Submiting..' : 'Create' }
          </button>
          { goBackFunction &&
            <button className='button button--secondary' onClick={goBackFunction}>Cancel</button> }
        </form>
      </div>
    )
  }
}

CreateUserForm.propTypes = {
  startCreateUser: PropTypes.func,
  goBackFunction: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  startCreateUser: (emai, password) => dispatch(startCreateUser(emai, password))
})

export default connect(undefined, mapDispatchToProps)(CreateUserForm)
