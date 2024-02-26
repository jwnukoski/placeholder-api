import express from 'express'
import random from 'random'

/**
  * @openapi
  * /api/v1/random/int:
  *  get:
  *   tags: [/api/v1/random]
  *   summary: Integer
  *   description: Returns a random integer between a given min and max number.
  *   parameters:
  *     - in: query
  *       name: min
  *       required: true
  *       description: The minimum number.
  *       schema:
  *         type: integer
  *     - in: query
  *       name: max
  *       required: true
  *       description: The maximum number.
  *       schema:
  *         type: integer
  *   responses:
  *     '200':
  *       description: A random number.
  *       content:
  *         application/json:
  *           schema:
  *             type: integer
  *             example: 123
  *     '400':
  *       description: Bad request
  *       content:
  *         plain/text:
  *           schema:
  *             type: string
  *             example: Min is not a number
  *
 */
export default express.Router().get('/', (req, res) => {
  const min: number = Number(req?.query?.min)
  const max: number = Number(req?.query?.max)

  if (Number.isNaN(min)) {
    res.status(400).send('Min is not a number')
    return
  }

  if (Number.isNaN(max)) {
    res.status(400).send('Max is not a number')
    return
  }

  if (min > max) {
    res.status(400).send('Min is greater than max')
    return
  }

  if (max > Number.MAX_SAFE_INTEGER || max < Number.MIN_SAFE_INTEGER) {
    res.status(400).send(`Max must be between ${Number.MIN_SAFE_INTEGER} and ${Number.MAX_SAFE_INTEGER}`)
    return
  }

  if (min > Number.MAX_SAFE_INTEGER || min < Number.MIN_SAFE_INTEGER) {
    res.status(400).send(`Min must be between ${Number.MIN_SAFE_INTEGER} and ${Number.MAX_SAFE_INTEGER}`)
    return
  }

  const result = random.int(Number(min), Number(max))

  res.status(200).json(result)
})
