import { Router } from 'express'
import * as Mongoose from 'mongoose'

import AccountModel from '../models/account'

import { Request, Response, NextFunction } from 'express'

console.log(Mongoose.connect)
Mongoose.connect('mongodb://localhost:27017/accounts', { useNewUrlParser: true })

const accountsRouter = Router()

accountsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  /* get an account using the id */

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

accountsRouter.post('/create', () => {
  /* take a payload and create an account from it */
})

accountsRouter.put('/:id', () => {
  /* update an account details */
})

accountsRouter.delete('/:id', () => {
  /* delete account that has the given id */
})

export default accountsRouter
