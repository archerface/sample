import { default as express } from 'express'
import * as bodyParser from 'body-parser'
import { default as helmet } from 'helmet'
import { default as morgan } from 'morgan'

import { Request, Response, NextFunction } from 'express'

const PORT = 3000

const app = express()

app.use(helmet())
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: `Hey did it work? ${Math.floor(Math.random() * 100000)}`
  })

  next()
})

app.listen(PORT, () => {
  console.log(`Server stating at http://localhost:${PORT}`)
})
