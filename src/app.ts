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
app.use(cors({origin: ['https://car-rental-frontend-ashen.vercel.app']}))

// application routes
app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Car Rental Reservation')
})


app.use(globalErrorHandler)

// Not found
app.use(notFound)


export default app