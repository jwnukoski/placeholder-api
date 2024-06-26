import express from 'express'
import { LoremIpsum } from 'lorem-ipsum'

export const MAX_SENTENCES = 100
export const MAX_WORDS_PER_SENTENCE = 16

/**
  * @openapi
  * /api/v1/lorem-ipsum/sentences:
  *  get:
  *   tags: [Lorem Ipsum]
  *   summary: Sentences
  *   description: Returns lorem ipsum sentence(s).
  *   parameters:
  *     - in: query
  *       name: count
  *       description: Number of paragraphs.
  *       schema:
  *         type: number
  *         minimum: 1
  *         maximum: 100
  *         default: 1
  *     - in: query
  *       name: min
  *       description: Minimum words per sentence.
  *       schema:
  *         type: number
  *         minimum: 1
  *         maximum: 15
  *         default: 1
  *     - in: query
  *       name: max
  *       description: Maximum words per sentence.
  *       schema:
  *         type: number
  *         minimum: 1
  *         maximum: 16
  *         default: 16
  *   responses:
  *     '200':
  *       description: Random lorem ipsum sentence(s).
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
  *             example: Count is not a number.
 */
export default express.Router().get('/', (req, res) => {
  let count: number = 1
  let minWordsPerSentence = 1
  let maxWordsPerSentence = MAX_WORDS_PER_SENTENCE

  // Parse
  if (req?.query?.count !== undefined) {
    count = parseInt(req.query.count as string)
  }

  if (req?.query?.min !== undefined) {
    minWordsPerSentence = parseInt(req.query.min as string)
  }

  if (req?.query?.max !== undefined) {
    maxWordsPerSentence = parseInt(req.query.max as string)
  }

  // Verify is a number
  if (isNaN(count)) {
    res.status(400).send('Count is not a number.')
    return
  }

  if (isNaN(minWordsPerSentence)) {
    res.status(400).send('Min is not a number.')
    return
  }

  if (isNaN(maxWordsPerSentence)) {
    res.status(400).send('Max is not a number.')
    return
  }

  // Verify lengths
  if (minWordsPerSentence > maxWordsPerSentence) {
    res.status(400).send(`Min (${minWordsPerSentence}) is greater than max (${maxWordsPerSentence}).`)
    return
  }

  if (count > MAX_SENTENCES || count < 1) {
    res.status(400).send(`Count of ${count} is invalid. Valid is 1 - ${MAX_SENTENCES}.`)
    return
  }

  if (maxWordsPerSentence > MAX_WORDS_PER_SENTENCE || maxWordsPerSentence < 1) {
    res.status(400).send(`Max of ${maxWordsPerSentence} is invalid. Valid is 1 - ${MAX_WORDS_PER_SENTENCE}`)
    return
  }

  if (minWordsPerSentence < 1 || minWordsPerSentence > MAX_WORDS_PER_SENTENCE - 1) {
    res.status(400).send(`Min is of ${minWordsPerSentence} is invalid. Valid is 1 - ${MAX_WORDS_PER_SENTENCE - 1}`)
    return
  }

  const lorem = new LoremIpsum({
    wordsPerSentence: {
      max: maxWordsPerSentence,
      min: minWordsPerSentence
    }
  })

  const word: string = lorem.generateSentences(count)

  res.status(200).json(word)
})
