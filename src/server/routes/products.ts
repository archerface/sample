import { Router } from 'express'

import { Request, Response, NextFunction } from 'express'

const productsRouter = Router()

productsRouter.get('/:id', () => {
  /* return a product */
})

productsRouter.get('/all', () => {
  /* return all products */
})

export default productsRouter
