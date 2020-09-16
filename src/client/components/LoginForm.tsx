import React from 'react'
import ReactDOM from 'react-dom'

import { makeRequest } from '../utils/requests'

import './loginForm.css'

interface LoginFormProps {
  formSubmitCallback: React.Dispatch<
    // stolen straight form VSCode's type preview overlay
    React.SetStateAction<{
      renderCreateForm: boolean
      renderLoginForm: boolean
    }>
  >
}

interface FormData {
  email: string
  password: string
}

interface LoginFormState extends FormData {
  errors: {
    email: boolean
    password: boolean
  }
}

export default class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
  constructor(props: LoginFormProps) {
    super(props)

    this.state = {
      email: '',
      password: '',
      errors: {
        email: false,
        password: false
      }
    }

    this._submitLogin = this._submitLogin.bind(this)
    this._handleEmailChange = this._handleEmailChange.bind(this)
    this._handlePasswordChange = this._handlePasswordChange.bind(this)
  }

  async _submitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = {
      email: this.state.email,
      password: this.state.password
    }

    const response = await makeRequest<FormData>('/accounts/login', 'POST', formData)
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

  _handleEmailChange(event: React.FormEvent<HTMLInputElement>) {
    const value = (event.target as HTMLInputElement).value

    this.setState({ email: value })
  }

  _handlePasswordChange(event: React.FormEvent<HTMLInputElement>) {
    const value = (event.target as HTMLInputElement).value
    this.setState({ password: value })
  }

  render(): React.ReactNode {
    return (
      <>
        <form className="sample__form__account__login" onSubmit={this._submitLogin}>
          <label>
            Email:
            <input
              type="email"
              value={this.state.email}
              onChange={this._handleEmailChange}
              autoComplete="username"
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={this.state.password}
              onChange={this._handlePasswordChange}
              autoComplete="current-password"
              required
            />
          </label>
          <input type="submit" value="Log In" />
        </form>
      </>
    )
  }
}
