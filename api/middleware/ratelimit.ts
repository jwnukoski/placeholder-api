import express from 'express'
import { MongoClient } from 'mongodb'

// add authentication
const uri =
  `mongodb+srv://${process.env.RATELIMIT_DB_USER}:${process.env.RATELIMIT_DB_PASSWORD}@localhost:27017`;

const url = process.env.NODE_ENV === 'development'
  ? `mongodb://${process.env.RATELIMIT_DB_USER}:${process.env.RATELIMIT_DB_PASSWORD}@localhost:${process.env.RATELIMIT_DB_PORT}/?tls=false`
  : `mongodb://${process.env.RATELIMIT_DB_USER}:${process.env.RATELIMIT_DB_PASSWORD}@ratelimit-db:${process.env.RATELIMIT_DB_PORT}/?tls=false`



const client = new MongoClient(url)

const dbName = process.env.RATELIMIT_DB_NAME

client.connect().then(() => {
  const db = client.db(dbName)
  const collection = db.collection('documents')
  console.log('Connected to database')
  return 'done'
})

export default express.Router().all('*', (req, res, next) => {
  console.log(req.ip)

  next()
})
