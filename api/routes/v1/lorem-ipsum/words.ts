import express from 'express'
import { LoremIpsum } from 'lorem-ipsum'

export const MAX_WORDS = 100

/**
  * @openapi
  * /api/v1/lorem-ipsum/words:
  *  get:
  *   tags: [/api/v1/lorem-ipsum]
  *   summary: Sentences
  *   description: Returns a random lorem ipsum sentence.
  *   parameters:
  *     - in: query
  *       name: count
  *       description: Number of words in the sentence.
  *       schema:
  *         type: number
  *         minimum: 1
  *         maximum: 100
  *         default: 1
  *   responses:
  *     '200':
  *       description: Random lorem ipsum sentence.
  *       content:
  *         application/json:
  *           schema:
  *             type: string
  *             example: Lorem ipsum...
  *     '400':
  *       description: Bad request
  *       content:
  *         plain/text:
  *           schema:
  *             type: string
  *             example: Invalid count...
 */
export default express.Router().get('/', (req, res) => {
  let count: number = 1

  if (req?.query?.count !== undefined) {
    count = parseInt(req.query.count as string)
  }

  if (count < 1 || count > MAX_WORDS || isNaN(count)) {
    res.status(400).send(`Invalid count. Valid is 1 - ${MAX_WORDS}`)
    return
  }

  const lorem = new LoremIpsum()
  const word: string = lorem.generateWords(count)

  res.status(200).json(word)
})
