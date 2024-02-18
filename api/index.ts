import express, { type Express } from 'express'
import routes from './routes/index'
import ratelimit from './middleware/ratelimit'
import delay from './middleware/delay'

const app: Express = express()

app.use(express.json())

const port = process?.env?.API_PORT ?? 8080

// Middleware
app.use(ratelimit) // Limit requests
app.use(delay) // Optional additional delay to requests

// Routes
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`)
})

export default app
