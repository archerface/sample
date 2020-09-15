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

  _validateUsername(event: React.FormEvent<HTMLInputElement>) {
    const inputEl = event.target as HTMLInputElement
    const inputValue = inputEl.value

    this.setState({ username: inputValue })
  }

  _validateEmail(event: React.FormEvent<HTMLInputElement>) {
    const inputEl = event.target as HTMLInputElement
    const inputValue = inputEl.value

    this.setState({ email: inputValue })
  }

  _validatePassword(event: React.FormEvent<HTMLInputElement>) {
    const inputEl = event.target as HTMLInputElement
    const inputValue = inputEl.value

    this.setState({ password: inputValue })
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
