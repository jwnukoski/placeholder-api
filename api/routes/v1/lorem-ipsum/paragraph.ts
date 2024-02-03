import express from 'express'
import { LoremIpsum } from 'lorem-ipsum'
import { MAX_WORDS_PER_SENTENCE, MAX_SENTENCES } from './sentences'

export const MAX_PARAGRAPHS = 20

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
    res.status(400).json('Count is not a number.')
    return
  }

  if (isNaN(minWordsPerSentence)) {
    res.status(400).json('Min words per sentence is not a number.')
    return
  }

  if (isNaN(maxWordsPerSentence)) {
    res.status(400).json('Max words per sentence is not a number.')
    return
  }

  if (isNaN(minSentencesPerParagraph)) {
    res.status(400).json('Min sentences per paragraph is not a number.')
    return
  }

  if (isNaN(maxSentencesPerParagraph)) {
    res.status(400).json('Max sentences per paragraph is not a number.')
    return
  }

  // Verify lengths
  if (count > MAX_PARAGRAPHS || count < 1) {
    res.status(400).json(`Count of ${count} is invalid. Valid is 1 - ${MAX_PARAGRAPHS}.`)
    return
  }

  if (maxWordsPerSentence > MAX_WORDS_PER_SENTENCE || maxWordsPerSentence < 1) {
    res.status(400).json(`Max of ${maxWordsPerSentence} is invalid. Valid is 1 - ${MAX_WORDS_PER_SENTENCE}`)
    return
  }

  if (minWordsPerSentence > maxWordsPerSentence) {
    res.status(400).json(`Min (${minWordsPerSentence}) is greater than max (${maxWordsPerSentence}).`)
    return
  }

  if (minWordsPerSentence < 1 || minWordsPerSentence > MAX_WORDS_PER_SENTENCE) {
    res.status(400).json(`Min is of ${minWordsPerSentence} is invalid. Valid is 1 - ${MAX_WORDS_PER_SENTENCE - 1}`)
    return
  }

  if (minSentencesPerParagraph > maxSentencesPerParagraph) {
    res.status(400).json(`Min (${minSentencesPerParagraph}) is greater than max (${maxSentencesPerParagraph}).`)
    return
  }

  if (minSentencesPerParagraph < 1 || minSentencesPerParagraph > MAX_SENTENCES - 1) {
    res.status(400).json(`Min is of ${minSentencesPerParagraph} is invalid. Valid is 1 - ${MAX_SENTENCES - 1}`)
    return
  }

  if (maxSentencesPerParagraph > MAX_SENTENCES || maxSentencesPerParagraph < 1) {
    res.status(400).json(`Max of ${maxSentencesPerParagraph} is invalid. Valid is 1 - ${MAX_SENTENCES}`)
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

  const word: string = lorem.generateParagraphs(count)

  res.status(200).json(word)
})
