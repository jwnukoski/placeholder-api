import express from 'express'

export default express.Router().all('*', (req, res, next) => {
  console.log('This is a middleware that runs on all routes')
  next()
})
