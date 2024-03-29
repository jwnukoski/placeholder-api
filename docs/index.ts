import express from 'express'
import swaggerSpec from './swaggerSpec'
import swaggerUi from 'swagger-ui-express'

const port = 3000
const app = express()

app.use(express.static('public'))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`)
})
