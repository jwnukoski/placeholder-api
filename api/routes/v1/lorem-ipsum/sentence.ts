// api/v1/random/int
import express from 'express'

export default express.Router().get('/', (req, res) => {
  res.status(200).json('')
})
