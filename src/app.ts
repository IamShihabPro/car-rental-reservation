import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import notFound from './app/middlewares/notFound'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import cookieParser from 'cookie-parser'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: ['http://localhost:5173']}))

// application routes
app.use('/api', router)


// const test = (req: Request, res: Response) => {
//   const a = 10
//   res.send(a)
// }

// app.get('/', test)

app.get('/', (req: Request, res: Response) => {
  res.send('Assignment 3')
})


app.use(globalErrorHandler)

// Not found
app.use(notFound)


export default app