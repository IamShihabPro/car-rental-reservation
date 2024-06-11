import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import notFound from './app/middlewares/notFound'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorhandler'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cors({origin: ['http://localhost:5173']}))

// application routes
app.use('/api', router)

// Not found
app.use(notFound)

const test = (req: Request, res: Response) => {
  const a = 10
  res.send(a)
}

app.get('/', test)

app.use(globalErrorHandler)

export default app