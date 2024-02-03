import express from 'express'
import { LoremIpsum } from 'lorem-ipsum'

export const MAX_COUNT = 100
export const MAX_WORDS_PER_SENTENCE = 16

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
    res.status(400).json('Count is not a number.')
    return
  }

  if (isNaN(minWordsPerSentence)) {
    res.status(400).json('Min is not a number.')
    return
  }

  if (isNaN(maxWordsPerSentence)) {
    res.status(400).json('Max is not a number.')
    return
  }

  // Verify lengths
  if (minWordsPerSentence > maxWordsPerSentence) {
    res.status(400).json(`Min (${minWordsPerSentence}) is greater than max (${maxWordsPerSentence}).`)
    return
  }

  if (count > MAX_COUNT || count < 1) {
    res.status(400).json(`Count of ${count} is invalid. Valid is 1 - ${MAX_COUNT}.`)
    return
  }

  if (maxWordsPerSentence > MAX_WORDS_PER_SENTENCE || maxWordsPerSentence < 1) {
    res.status(400).json(`Max of ${maxWordsPerSentence} is invalid. Valid is 1 - ${MAX_WORDS_PER_SENTENCE}`)
    return
  }

  if (minWordsPerSentence < 1 || minWordsPerSentence > MAX_WORDS_PER_SENTENCE - 1) {
    res.status(400).json(`Min is of ${minWordsPerSentence} is invalid. Valid is 1 - ${MAX_WORDS_PER_SENTENCE - 1}`)
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
