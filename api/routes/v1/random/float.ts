import express from 'express'
import random from 'random'

/**
  * @openapi
  * /api/v1/random/float:
  *  get:
  *   tags: [/api/v1/random]
  *   summary: Float
  *   description: Returns a random float in a given min and max range.
  *   parameters:
  *     - in: query
  *       name: min
  *       required: true
  *       description: Minimum float.
  *       schema:
  *         type: number
  *         minimum: Number.MIN_SAFE_INTEGER
  *         maximum: Number.MAX_SAFE_INTEGER
  *     - in: query
  *       name: height
  *       required: true
  *       description: Maximum float.
  *       schema:
  *         type: number
  *         minimum: Number.MIN_SAFE_INTEGER
  *         maximum: Number.MAX_SAFE_INTEGER
  *   responses:
  *     '200':
  *       description: A random float between min and max.
  *       content:
  *         application/json:
  *           schema:
  *             type: number
  *             example: 1.55
  *     '400':
  *       description: Bad request
  *       content:
  *         plain/text:
  *           schema:
  *             type: string
  *             example: Min is not a number
 */
export default express.Router().get('/', (req, res) => {
  const min = Number(req?.query?.min)
  const max = Number(req?.query?.max)

  if (isNaN(min)) {
    res.status(400).send('Min is not a number')
    return
  }

  if (isNaN(max)) {
    res.status(400).send('Max is not a number')
    return
  }

  if (min > max) {
    res.status(400).send('Min is greater than max')
    return
  }

  if (max > Number.MAX_SAFE_INTEGER || max < Number.MIN_SAFE_INTEGER) {
    res.status(400).send('Max is too large')
    return
  }

  if (min > Number.MAX_SAFE_INTEGER || min < Number.MIN_SAFE_INTEGER) {
    res.status(400).send('Min is too large')
    return
  }

  const result = random.float(Number(min), Number(max))

  res.status(200).json(result)
})
