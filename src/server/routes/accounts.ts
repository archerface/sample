import { Router } from 'express'
import { default as Mongoose } from 'mongoose'
import { v4 } from 'uuid'
import { hash, compare } from 'bcrypt'

import AccountModel, { AccountData } from '../models/account'

import { Request, Response, NextFunction } from 'express'
import { AccountCreationData, validateAccountBody } from '../utils/accountUtils'

Mongoose.connect('mongodb://localhost:27017/accounts', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const TWELVE_HOURS_IN_MILLIS = 1000 * 60 * 60 * 12

const accountsRouter = Router()

accountsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const account: AccountData | null = await AccountModel.findOne({ id: req.params.id })

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

accountsRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  /* update an account details */
  next()
})

accountsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  /* delete account that has the given id */
  next()
})

accountsRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  const accountId = v4()
  const accountData: AccountCreationData = req.body

  if (req.cookies.accountId) {
    const existingAccount: AccountData | null = await AccountModel.findOne({
      id: req.cookies.accountId
    })

    if (existingAccount) {
      res.status(409).json({
        error: true,
        message: 'Account already exists with the given username or email',
        data: {}
      })
    }
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
      maxAge: TWELVE_HOURS_IN_MILLIS // expire in 12 hours
    })

    res.status(200).json({
      error: false,
      message: 'Account was successfully created',
      data: {}
    })
  }

  next()
})

accountsRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const accountData: AccountData | null = await AccountModel.findOne({ email: req.body.email })

  if (!accountData) {
    res.status(404).json({
      error: true,
      message: 'No account found for the given email.',
      data: {}
    })
  } else {
    const passwordMatches = await compare(req.body.password, accountData.hashedPassword)

    if (passwordMatches) {
      res.cookie('accountId', accountData.id, {
        maxAge: TWELVE_HOURS_IN_MILLIS // expire in 12 hours
      })
      res.status(200).json({
        error: false,
        message: 'Log in successful',
        data: {}
      })
    } else {
      res.status(401).json({
        error: true,
        message: 'Wrong password. Please try again!',
        data: {}
      })
    }
  }

  next()
})

accountsRouter.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  // end the session created by express
  req.session?.destroy((error) => console.error('Got an error while attempting to log out', error))
  res.cookie('accountId', '', {
    maxAge: 0
  })

  res.status(200).json({
    error: false,
    message: 'Logged out successfully.',
    data: {}
  })

  next()
})

export default accountsRouter
