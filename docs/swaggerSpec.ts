import swaggerJSDoc from 'swagger-jsdoc'

// Defines root info for api
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Placeholder API Documentation',
    version: '1.0.0',
    description: 'A free-to-use API for retreiving random placeholder data.'
  },
  servers: [
    {
      url: 'https://placeholder-api.com',
      description: 'Production server'
    }
  ]
}

// Paths to files containing OpenAPI definitions
const swaggerOptions = {
  swaggerDefinition,
  apis: [
    '../api/middleware/*.ts',
    '../api/routes/v1/lorem-ipsum/*.ts',
    '../api/routes/v1/random/*.ts'
  ],
  supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'] /* Exclude Head */
}

// Produces OpenAPI sepecification (equivalent to a swagger.json file)
export default swaggerJSDoc(swaggerOptions)

export { swaggerDefinition, swaggerOptions }
