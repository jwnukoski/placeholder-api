import express from 'express'
import { LoremIpsum } from 'lorem-ipsum'
import { MAX_WORDS_PER_SENTENCE, MAX_SENTENCES } from './sentences'

export const MAX_PARAGRAPHS = 20

/**
  * @openapi
  * /api/v1/lorem-ipsum/paragraphs:
  *  get:
  *   tags: [Lorem Ipsum]
  *   summary: Paragraphs
  *   description: Returns a lorem ipsum paragraph(s).
  *   parameters:
  *     - in: query
  *       name: count
  *       description: Number of paragraphs.
  *       schema:
  *         type: number
  *         minimum: 1
  *         maximum: 20
  *         default: 1
  *     - in: query
  *       name: min_wps
  *       description: Minimum words per sentence.
  *       schema:
  *         type: number
  *         minimum: 1
  *         maximum: 15
  *         default: 1
  *     - in: query
  *       name: max_wps
  *       description: Maximum words per sentence.
  *       schema:
  *         type: number
  *         minimum: 1
  *         maximum: 16
  *         default: 16
  *     - in: query
  *       name: min_spp
  *       description: Minimum sentences per paragraph.
  *       schema:
  *         type: number
  *         minimum: 1
  *         maximum: 99
  *         default: 1
  *     - in: query
  *       name: max_spp
  *       description: Maximum sentences per paragraph.
  *       schema:
  *         type: number
  *         minimum: 1
  *         maximum: 100
  *         default: 100
  *   responses:
  *     '200':
  *       description: Random lorem ipsum paragraph(s).
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
  let minSentencesPerParagraph = 1
  let maxSentencesPerParagraph = MAX_SENTENCES

  // Parse
  if (req?.query?.count !== undefined) {
    count = parseInt(req.query.count as string)
  }

  if (req?.query?.min_wps !== undefined) {
    minWordsPerSentence = parseInt(req.query.min_wps as string)
  }

  if (req?.query?.max_wps !== undefined) {
    maxWordsPerSentence = parseInt(req.query.max_wps as string)
  }

  if (req?.query?.min_spp !== undefined) {
    minSentencesPerParagraph = parseInt(req.query.min_spp as string)
  }

  if (req?.query?.max_spp !== undefined) {
    maxSentencesPerParagraph = parseInt(req.query.max_spp as string)
  }

  // Verify is a number
  if (isNaN(count)) {
    res.status(400).send('Count is not a number.')
    return
  }

  if (isNaN(minWordsPerSentence)) {
    res.status(400).send('Min words per sentence is not a number.')
    return
  }

  if (isNaN(maxWordsPerSentence)) {
    res.status(400).send('Max words per sentence is not a number.')
    return
  }

  if (isNaN(minSentencesPerParagraph)) {
    res.status(400).send('Min sentences per paragraph is not a number.')
    return
  }

  if (isNaN(maxSentencesPerParagraph)) {
    res.status(400).send('Max sentences per paragraph is not a number.')
    return
  }

  // Verify lengths
  if (count > MAX_PARAGRAPHS || count < 1) {
    res.status(400).send(`Count of ${count} is invalid. Valid is 1 - ${MAX_PARAGRAPHS}.`)
    return
  }

  if (maxWordsPerSentence > MAX_WORDS_PER_SENTENCE || maxWordsPerSentence < 1) {
    res.status(400).send(`Max of ${maxWordsPerSentence} is invalid. Valid is 1 - ${MAX_WORDS_PER_SENTENCE}`)
    return
  }

  if (minWordsPerSentence > maxWordsPerSentence) {
    res.status(400).send(`Min (${minWordsPerSentence}) is greater than max (${maxWordsPerSentence}).`)
    return
  }

  if (minWordsPerSentence < 1 || minWordsPerSentence > MAX_WORDS_PER_SENTENCE) {
    res.status(400).send(`Min is of ${minWordsPerSentence} is invalid. Valid is 1 - ${MAX_WORDS_PER_SENTENCE - 1}`)
    return
  }

  if (minSentencesPerParagraph > maxSentencesPerParagraph) {
    res.status(400).send(`Min (${minSentencesPerParagraph}) is greater than max (${maxSentencesPerParagraph}).`)
    return
  }

  if (minSentencesPerParagraph < 1 || minSentencesPerParagraph > MAX_SENTENCES - 1) {
    res.status(400).send(`Min is of ${minSentencesPerParagraph} is invalid. Valid is 1 - ${MAX_SENTENCES - 1}`)
    return
  }

  if (maxSentencesPerParagraph > MAX_SENTENCES || maxSentencesPerParagraph < 1) {
    res.status(400).send(`Max of ${maxSentencesPerParagraph} is invalid. Valid is 1 - ${MAX_SENTENCES}`)
    return
  }

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: maxSentencesPerParagraph,
      min: minSentencesPerParagraph
    },
    wordsPerSentence: {
      max: maxWordsPerSentence,
      min: minWordsPerSentence
    }
  })

  const paragraphs: string = lorem.generateParagraphs(count)

  res.status(200).json(paragraphs)
})
