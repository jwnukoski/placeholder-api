import express from 'express'

export const DELAY_MAX = Number(process?.env?.DELAY_MAX ?? 10000)

/**
  * @openapi
  * X-Delay:
  *  *:
  *   tags: [Middleware]
  *   summary: Optional user set response delay.
  *   description: Adds an additional delay to any response.
  *   parameters:
  *     - in: header
  *       name: X-Delay
  *       description: Number of milliseconds to delay the response.
  *       schema:
  *         type: number
  *         minimum: 0
  *         maximum: 5000
  *         default: 0
  *   responses:
  *     '*':
  *       description: Message if the delay was used or failed. Empty if not used.
  *       content:
  *         plain/text:
  *           schema:
  *             type: string
  *             example: Additional delay of 2000ms used
 */
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
