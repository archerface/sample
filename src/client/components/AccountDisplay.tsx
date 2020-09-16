import React, { useState, useEffect, useCallback } from 'react'
import { ServerResponse, makeRequest } from '../utils/requests'

interface AccountDisplayProps {
  accountId: string
}

interface AccountData {
  username: string
  email: string
}

async function _getAccountData(accountId: string): Promise<AccountData> {
  const accountData: ServerResponse = await makeRequest(`/accounts/${accountId}`, 'GET')
  return accountData.data as AccountData
}

async function _logOut(accountId: string) {
  return async (event: React.MouseEvent<HTMLButtonElement>) => {
    await makeRequest('/accounts/logout', 'GET')
    window.location.reload()
  }
}

async function _deleteAccount(accountId: string) {}

export default function AccountDisplay(props: AccountDisplayProps): React.ReactFragment {
  const [accountData, setAccountData] = useState({ username: '', email: '' })

  useEffect(() => {
    _getAccountData(props.accountId).then((data) => {
      setAccountData({ ...data })
    })
  })

  const logoutButtom = (
    <button onClick={_logOut(props.accountId)} disabled={!!accountData.email.length}>
      Log Out
    </button>
  )
  const

  return (
    <div className="sample__form__account__display">
      <h1>
        Username: <span>{accountData.username}</span>
      </h1>
      <h1>
        Email: <span>{accountData.email}</span>
      </h1>
    </div>
  )
}
