import * as React from 'react'

interface AccountDisplayProps {
  accountId: string
}

export default function AccountDisplay(props: AccountDisplayProps): React.ReactElement {
  return <h1>Hey is this your account?</h1>
}
