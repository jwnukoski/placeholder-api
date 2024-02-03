// api/v1/random/int
import express from 'express'
import random from 'random'

export default express.Router().get('/', (req, res) => {
  const min: any = Number(req?.query?.min)
  const max: any = Number(req?.query?.max)

  if (Number.isNaN(min)) {
    res.status(400).send('Min is not a number')
    return
  }

  if (Number.isNaN(max)) {
    res.status(400).send('Max is not a number')
    return
  }

  const result = random.int(Number(min), Number(max))

  res.status(200).json(result)
})
