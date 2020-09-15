import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import './App.css'

import CreateAccountForm from './components/CreateAccountForm'
import LoginForm from './components/LoginForm'
import AccountDisplay from './components/AccountDisplay'

function _getAccountIdCookie(): string | undefined {
  const cookie = document.cookie.split(';').filter((cookie) => cookie.includes('accountId='))[0]

  return cookie
}

export default function App() {
  const accountIdCookie = _getAccountIdCookie()
  const [{ renderCreateForm, renderLoginForm }, setFormToRender] = useState({
    renderCreateForm: false,
    renderLoginForm: false
  })

  const backButton = (
    <button onClick={() => setFormToRender({ renderCreateForm: false, renderLoginForm: false })}>
      {'< Back'}
    </button>
  )

  let fragmentToRender: React.ReactNode

  if (accountIdCookie) {
    fragmentToRender = <AccountDisplay accountId={accountIdCookie.split('=')[1]} />
  } else if (renderCreateForm) {
    fragmentToRender = (
      <>
        {backButton}
        <CreateAccountForm />
      </>
    )
  } else if (renderLoginForm) {
    fragmentToRender = (
      <>
        {backButton}
        <LoginForm />
      </>
    )
  } else {
    fragmentToRender = (
      <>
        <button onClick={() => setFormToRender({ renderCreateForm: false, renderLoginForm: true })}>
          Log In
        </button>
        <button onClick={() => setFormToRender({ renderCreateForm: true, renderLoginForm: false })}>
          Create Account
        </button>
      </>
    )
  }

  return <div className="app">{fragmentToRender}</div>
}
