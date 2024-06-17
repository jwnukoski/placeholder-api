import express from 'express'
import random from 'random'

/**
  * @openapi
  * /api/v1/primitive/boolean:
  *  get:
  *   tags: [Primitive]
  *   summary: Boolean
  *   description: Returns a random boolean.
  *   responses:
  *     '200':
  *       description: A random boolean.
  *       content:
  *         application/json:
  *           schema:
  *             type: boolean
  *             example: true
 */
export default express.Router().get('/', (_req, res) => {
  res.status(200).json(random.bool())
})
