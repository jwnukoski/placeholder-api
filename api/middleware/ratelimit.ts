import express from 'express'

export default express.Router().all('*', (req, res, next) => {
  // console.log(req.ip)
  next()
})
