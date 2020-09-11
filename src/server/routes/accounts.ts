import { Router } from 'express'

import { Request, Response, NextFunction } from 'express'

const accountsRouter = Router()

accountsRouter.get('/:id', () => {
  /* get an account using the id */
})

accountsRouter.post('/create', () => {
  /* take a payload and create an account from it */
})

accountsRouter.patch('/:id', () => {
  /* update an account details */
})

accountsRouter.delete('/:id', () => {
  /* delete account that has the given id */
})

export default accountsRouter
