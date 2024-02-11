import express from 'express'

const DELAY_MAX = Number(process?.env?.DELAY_MAX ?? 10000)

// Lets the user set a delay for all requests
export default express.Router().all('*', (req, res, next) => {
  if (req.headers['X-Delay'] === undefined) {
    next()
  }

  const delay = Number(req.headers['X-Delay'])

  if (isNaN(delay)) {
    res.setHeader('X-Delay', `${delay} is not a number.`)
    next()
  }

  if (delay <= 0) {
    res.setHeader('X-Delay', `${delay} must be greater than 0.`)
    next()
  }

  if (delay > DELAY_MAX) {
    res.setHeader('X-Delay', `${delay} exceeds the max of ${DELAY_MAX}.`)
    next()
  }

  setTimeout(() => {
    res.header('X-Delay', `Additional delay of ${delay}ms used.`)
    next()
  }, delay)
})
