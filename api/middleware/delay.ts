import express from 'express'

export const DELAY_MAX = Number(process?.env?.DELAY_MAX ?? 10000)

// Lets the user set a delay for all requests
export default express.Router().all('*', (req, res, next) => {
  if (req.headers['x-delay'] === undefined) {
    next()
    return
  }

  const delay = Number(req.headers['x-delay'])

  if (isNaN(delay)) {
    res.setHeader('X-Delay', 'Input is not a number.')
    next()
    return
  }

  if (delay <= 0) {
    res.setHeader('X-Delay', 'X-Delay must be greater than 0.')
    next()
    return
  }

  if (delay > DELAY_MAX) {
    res.setHeader('X-Delay', `${delay} exceeds the max of ${DELAY_MAX}.`)
    next()
    return
  }

  setTimeout(() => {
    res.header('X-Delay', `Additional delay of ${delay}ms used.`)
    next()
  }, delay)
})
