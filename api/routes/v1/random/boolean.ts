// api/v1/random/int
import express from 'express'
import random from 'random'

export default express.Router().get('/', (_req, res) => {
  res.status(200).json(random.bool())
})
