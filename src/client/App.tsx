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
  const [{ renderCreateForm, renderLoginForm }, setViewToRender] = useState({
    renderCreateForm: false,
    renderLoginForm: false
  })

  const backButton = (
    <button onClick={() => setViewToRender({ renderCreateForm: false, renderLoginForm: false })}>
      {'< Back'}
    </button>
  )

  let fragmentToRender: React.ReactNode

  if (accountIdCookie && !renderCreateForm && !renderLoginForm) {
    fragmentToRender = <AccountDisplay accountId={accountIdCookie.split('=')[1]} />
  } else if (renderCreateForm) {
    fragmentToRender = (
      <>
        {backButton}
        <CreateAccountForm formSubmitCallback={setViewToRender} />
      </>
    )
  } else if (renderLoginForm) {
    fragmentToRender = (
      <>
        {backButton}
        <LoginForm formSubmitCallback={setViewToRender} />
      </>
    )
  } else {
    fragmentToRender = (
      <>
        <button onClick={() => setViewToRender({ renderCreateForm: false, renderLoginForm: true })}>
          Log In
        </button>
        or
        <button onClick={() => setViewToRender({ renderCreateForm: true, renderLoginForm: false })}>
          Create Account
        </button>
      </>
    )
  }

  return <div className="app">{fragmentToRender}</div>
}
