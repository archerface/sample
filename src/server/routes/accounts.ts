import { Router } from 'express'
import { default as Mongoose } from 'mongoose'
import { v4 } from 'uuid'
import { hash, compare } from 'bcrypt'

import AccountModel from '../models/account'

import { Request, Response, NextFunction } from 'express'
import { AccountCreationData, validateAccountBody } from '../utils/accountUtils'

Mongoose.connect('mongodb://localhost:27017/accounts', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const accountsRouter = Router()

accountsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const account = await AccountModel.findOne({ id: req.params.id })

  if (account) {
    res.status(200).json({
      error: false,
      message: '',
      data: account
    })
  } else {
    res.status(404).json({
      error: true,
      message: 'Account was not found',
      data: {}
    })
  }

  next()
})

accountsRouter.put('/:id', () => {
  /* update an account details */
})

accountsRouter.delete('/:id', () => {
  /* delete account that has the given id */
})

accountsRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  const accountId = v4()
  const accountData: AccountCreationData = req.body

  if (req.cookies.accountId) {
    const existingAccount = await AccountModel.findOne({ id: req.cookies.accountId })

    res.status(409).json({
      error: true,
      message: 'Account already exists with the given username or email',
      data: {}
    })
  } else if (validateAccountBody(req.body)) {
    const hashedPassword = await hash(accountData.password, 10)
    const userAccount = new AccountModel({
      id: accountId,
      email: accountData.email,
      username: accountData.username,
      hashedPassword
    })
    console.log('account model instance', userAccount)

    await userAccount.save()

    res.cookie('accountId', accountId, {
      maxAge: 1000 * 60 * 60 * 12 // expire in 12 hours
    })

    res.status(200).json({
      error: false,
      message: 'Account was successfully created',
      data: {}
    })
  }

  next()
})

accountsRouter.post('/login', (req: Request, res: Response, next: NextFunction) => {
  const accountData = req.body
  const accountId = req.session?.accountId

  next()
})

accountsRouter.post('/logout', (req: Request, res: Response, next: NextFunction) => {
  const accountData = req.body
  const accountId = req.session?.accountId

  next()
})


export default accountsRouter
