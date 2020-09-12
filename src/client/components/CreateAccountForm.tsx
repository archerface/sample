import React from 'react'
import ReactDOM from 'react-dom'

import './createAccountForm.css'

interface CreateAccountFormState {
  username: string
  password: string
  email: string
}

interface ValidationResult {
  valid: boolean
  reason?: string
}

export default class CreateAccountForm extends React.Component<{}, CreateAccountFormState> {
  constructor(props: React.Props<{}>) {
    super(props)

    this.state = {
      username: '',
      password: '',
      email: ''
    }
  }

  async _createAccount(): Promise<ValidationResult> {
    return { valid: true }
  }

  async _validateUsername(): Promise<ValidationResult> {
    return { valid: true }
  }

  async _validateEmail(): Promise<ValidationResult> {
    return { valid: true }
  }

  _validatePassword(): ValidationResult {
    return { valid: true }
  }

  render(): React.ReactNode {
    return (
      <form onSubmit={this._createAccount}>
        <label>
          Email:
          <input type="email" value={this.state.email} onChange={this._validateEmail} required />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={this.state.username}
            onChange={this._validateUsername}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={this.state.password}
            onChange={this._validatePassword}
            required
          />
        </label>
        <label>
          Repeat Password:
          <input type="password" value={''} onChange={this._validatePassword} required />
        </label>
        <input type="submit" value="Create Account" />
      </form>
    )
  }
}
