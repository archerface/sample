import React from 'react'
import { render } from 'react-dom'
import { ServerResponse, makeRequest } from '../utils/requests'

interface AccountDisplayProps {
  accountId: string
}

interface AccountDisplayState {
  username: string
  email: string
}

interface AccountData {
  username: string
  email: string
}

async function _getAccountData(accountId: string): Promise<AccountData> {
  const accountData: ServerResponse = await makeRequest(`/accounts/${accountId}`, 'GET')
  return accountData.data as AccountData
}

async function _deleteAccount(accountId: string) {}

export default class AccountDisplay extends React.Component<
  AccountDisplayProps,
  AccountDisplayState
> {
  constructor(props: AccountDisplayProps) {
    super(props)

    this.state = {
      username: '',
      email: ''
    }

    this._logOut = this._logOut.bind(this)
    this._deleteAccout = this._deleteAccout.bind(this)
  }

  componentDidMount() {
    _getAccountData(this.props.accountId).then((data) => {
      this.setState({ ...data })
    })
  }

  async _logOut(event: React.MouseEvent<HTMLButtonElement>) {
    await makeRequest('/accounts/logout', 'GET')
    // window.location.reload()
  }

  async _deleteAccout(event: React.MouseEvent<HTMLButtonElement>) {
    await makeRequest(`/accounts/${this.props.accountId}`, 'DELETE')
    window.location.reload()
  }

  render() {
    const logoutButtom = (
      <button onClick={this._logOut} disabled={!this.state.email.length}>
        Log Out
      </button>
    )
    const deleteAccountButton = (
      <button onClick={this._deleteAccout} disabled={!this.state.email.length}>
        Delete Account
      </button>
    )

    return (
      <div className="sample__form__account__display">
        <h1>
          Username: <span>{this.state.username}</span>
        </h1>
        <h1>
          Email: <span>{this.state.email}</span>
        </h1>
        <div className="sample__form__account__actions__container">
          {logoutButtom}
          {deleteAccountButton}
        </div>
      </div>
    )
  }
}
