import express from 'express'
import { LoremIpsum } from 'lorem-ipsum'

export const MAX_WORDS = 100

export default express.Router().get('/', (req, res) => {
  let count: number = 1

  if (req?.query?.count !== undefined) {
    count = parseInt(req.query.count as string)
  }

  if (count < 1 || count > MAX_WORDS || isNaN(count)) {
    res.status(400).json(`Invalid count. Valid is 1 - ${MAX_WORDS}`)
    return
  }

  const lorem = new LoremIpsum()
  const word: string = lorem.generateWords(count)

  res.status(200).json(word)
})
