import { Router } from 'express'

import { Request, Response, NextFunction } from 'express'

const productsRouter = Router()

// fake data to send to the front end.
const PRODUCT_STUBS = [
  {
    id: '1',
    name: 'Apple',
    image:
      'https://png.pngtree.com/element_our/png/20181129/vector-illustration-of-fresh-red-apple-with-single-leaf-png_248312.jpg'
  },
  {
    id: '2',
    name: 'Banana',
    image:
      'https://lh3.googleusercontent.com/proxy/LQj5xB0wNqcYgYTig_naFSgwrQsJxTkQApaWiIPyMLT5jiwfXn-PocX30caw4lr1F_WQgrIKx5yLItoXugvb-O-hVhAKcPDKvIWwmPs0KhvfDm11lZUVcBJh_qTkZHb-FFnvu-4'
  }
]

productsRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const product = PRODUCT_STUBS.filter(({ id }) => id === req.params.id)[0]

  if (product) {
    res.status(200).json({
      error: false,
      message: 'Product found',
      data: product
    })
  } else {
    res.status(404).json({
      error: true,
      message: `Product with the id ${req.params.id} doesn't exist.`,
      data: {}
    })
  }

  next()
})

productsRouter.get('/all', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    error: false,
    message: 'All available products',
    data: PRODUCT_STUBS
  })

  next()
})

export default productsRouter
