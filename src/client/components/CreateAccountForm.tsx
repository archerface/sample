import React from 'react'
import ReactDOM from 'react-dom'

import './createAccountForm.css'

interface CreateAccountFormState {
  username: string
  password: string
  email: string
  errors: {
    username: boolean
    password: boolean
    email: boolean
  }
}

interface ValidationResult {
  valid: boolean
  reason?: string
}

// super simple / naive regexes for validation
const USERNAME_REGEX = /\w+\d+/
const EMAIL_REGEX = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+\S/
const PASSWORD_REGEX = /[a-zA-Z0-9!@#$%^&*()+]+\S/

export default class CreateAccountForm extends React.Component<{}, CreateAccountFormState> {
  constructor(props: React.Props<{}>) {
    super(props)

    this.state = {
      username: '',
      password: '',
      email: '',
      errors: {
        username: false,
        password: false,
        email: false
      }
    }

    this._createAccount = this._createAccount.bind(this)
    this._validateUsername = this._validateUsername.bind(this)
    this._validateEmail = this._validateEmail.bind(this)
    this._validatePassword = this._validatePassword.bind(this)
  }

  async _createAccount(event: React.FormEvent<HTMLFormElement>) {
    // return { valid: true }
  }

  _validateUsername(event: React.FormEvent<HTMLInputElement>): ValidationResult {
    const inputEl = event.target as HTMLInputElement
    const inputValue = inputEl.value
    const usernameValid = USERNAME_REGEX.test(inputValue)

    console.log(usernameValid)

    this.setState({ username: inputValue })
    if (usernameValid) {
      const newErrors = Object.assign({}, this.state.errors, { username: false })
      this.setState({ errors: newErrors })
    } else {
      const newErrors = Object.assign({}, this.state.errors, { username: true })
      this.setState({ errors: newErrors })
    }

    console.log(this.state)

    return { valid: true }
  }

  _validateEmail(event: React.FormEvent<HTMLInputElement>): ValidationResult {
    const inputEl = event.target as HTMLInputElement
    const inputValue = inputEl.value
    this.setState({ email: inputValue })

    console.log(this.state)
    return { valid: true }
  }

  _validatePassword(event: React.FormEvent<HTMLInputElement>): ValidationResult {
    const inputEl = event.target as HTMLInputElement
    const inputValue = inputEl.value
    this.setState({ password: inputValue })
    return { valid: true }
  }

  render(): React.ReactNode {
    return (
      <form onSubmit={this._createAccount} className="sample__form__account__create">
        <label>
          Email:
          <input
            type="email"
            className={`sample__form__account__create__input ${
              this.state.errors.email ? 'invalid' : ''
            }`}
            value={this.state.email}
            onChange={this._validateEmail}
            required
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            className={`sample__form__account__create__input ${
              this.state.errors.username ? 'invalid' : ''
            }`}
            value={this.state.username}
            onChange={this._validateUsername}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            className={`sample__form__account__create__input ${
              this.state.errors.password ? 'invalid' : ''
            }`}
            value={this.state.password}
            onChange={this._validatePassword}
            autoComplete="off"
            required
          />
        </label>
        <input type="submit" value="Create Account" />
      </form>
    )
  }
}
