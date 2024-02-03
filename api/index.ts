import express, { type Express } from 'express'
import routes from './routes/index'
import ratelimit from './middleware/ratelimit'

const app: Express = express()

app.use(express.json())

const port = 8080

// // Middleware setup
// app.use(express.json());
// // Add more middleware if needed

app.use(ratelimit)

// Routes
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`)
})

export default app