export type AccountCreationData = Readonly<{
  email: string
  username: string
  password: string
}>

export function validateAccountBody(accountData: AccountCreationData): boolean {
  return true // its a sample. Should be fine
}
