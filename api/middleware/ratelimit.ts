import express from 'express'
import { MongoClient } from 'mongodb'

// mongodb://ratelimits:ratelimits@localhost:27017/?authSource=ratelimits&tls=false

const url = process.env.NODE_ENV === 'production'
  ? `mongodb://${process.env.RATELIMIT_DB_USER}:${process.env.RATELIMIT_DB_PASSWORD}@ratelimit-db:${process.env.RATELIMIT_DB_PORT}/?tls=false`
  : `mongodb://${process.env.RATELIMIT_DB_USER}:${process.env.RATELIMIT_DB_PASSWORD}@localhost:${process.env.RATELIMIT_DB_PORT}/?tls=false`

const client = new MongoClient(url)

export default express.Router().all('*', (req, res, next) => {
  client.connect().then(() => {
    const db = client.db('ratelimit')
    const collection = db.collection('documents')
    console.log('Connected to database')
    return 'done'
  }).catch((err) => {
    console.error(err)
  })
  console.log(req.ip)

  next()
})
