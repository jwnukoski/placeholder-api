import express, { Request, Response, NextFunction, type Express } from 'express'
import routes from './routes/index'

const app: Express = express()

app.use(express.json())

const port = process?.env?.PORT ?? 8080

// // Middleware setup
// app.use(express.json());
// // Add more middleware if needed

// Routes
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`)
})

export default app
