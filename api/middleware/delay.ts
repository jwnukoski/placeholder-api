import express from 'express'

// Lets the user set a delay for all requests
export default express.Router().all('*', (req, res, next) => {
  if (req.headers['X-Delay'] === undefined) {
    next()
  }

  const delay = Number(req.headers['X-Delay'])

  if (isNaN(delay)) {
    next()
  }

  if (delay < 0) {
    next()
  }
})
