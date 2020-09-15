import * as path from 'path'

import { default as express } from 'express'
import * as bodyParser from 'body-parser'
import { default as helmet } from 'helmet'
import { default as morgan } from 'morgan'
import { default as compression } from 'compression'
import { default as session } from 'express-session'
import { default as cookieParser } from 'cookie-parser'

import { Request, Response, NextFunction } from 'express'

import accountsRouter from './routes/accounts'
import productsRouter from './routes/products'

const PORT = process.env.PORT || 3000

const app = express()

app.use(helmet())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(compression())

app.use(
  session({
    secret: 'His name is Robert Paulson',
    cookie: {
      maxAge: 1000 * 60 * 60 * 12, // expire in 12 hours
      // since this is a demo and won't have an https connection there is no point in having a secure cookie
      secure: false
    },
    saveUninitialized: true,
    resave: true
  })
)

// static front end files; if I was making a real application I would set this whole thing
// behind a reverse proxy in nginx (or Api Gateway if in AWS) to handle error pages, compression, etc.
app.use(express.static(path.resolve('./dist/client')))

app.get('/', (req: Request, res: Response) => {
  const pathToIndex = path.resolve('./dist/client/index.html')
  res.status(200).sendFile(pathToIndex)
})

app.use('/sdl/v1/accounts', accountsRouter)

// app.use('/sdl/v1/products', productsRouter)

app.listen(PORT, () => {
  console.log(`Server stating at http://localhost:${PORT}`)
})
