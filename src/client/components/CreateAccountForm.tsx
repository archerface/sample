import React from 'react'
import ReactDOM from 'react-dom'

import { makeRequest } from '../utils/requests'

import './createAccountForm.css'

interface CreateAccountFormProps {
  formSubmitCallback: React.Dispatch<
    // stolen straight form VSCode's type preview overlay
    React.SetStateAction<{
      renderCreateForm: boolean
      renderLoginForm: boolean
    }>
  >
}

interface FormData {
  username: string
  password: string
  email: string
}

interface CreateAccountFormState extends FormData {
  errors: {
    username: boolean
    password: boolean
    email: boolean
  }
}

export default class CreateAccountForm extends React.Component<
  CreateAccountFormProps,
  CreateAccountFormState
> {
  _errorMessage: string = ''

  constructor(props: CreateAccountFormProps) {
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
    event.preventDefault()

    const formData = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    }

    const response = await makeRequest<FormData>('/accounts/create', 'POST', formData)
    console.log(response)

    this.props.formSubmitCallback({
      renderCreateForm: false,
      renderLoginForm: false
    })

    // If I was using a global state store like Redux, this is where I would just have the server
    // return the account info for the account that was just made. The problem is that I don't have
    // a global state store like Redux. So when I go to render the account page componets, I will have
    // to ask the server for the account info. Not a big deal but would be a minor optimization in a
    // real application.
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
            autoComplete="username"
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
            autoComplete="current-password"
            required
          />
        </label>
        <input type="submit" value="Create Account" />
        <span className="sample__form__account__create__error">{this._errorMessage}</span>
      </form>
    )
  }
}
