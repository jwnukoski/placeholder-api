import express from 'express'

function getMongoConnUrl (): string {
  return process.env.NODE_ENV === 'production'
    ? `mongodb://${process.env.RATELIMIT_DB_USER}:${process.env.RATELIMIT_DB_PASSWORD}@ratelimits-db:27017/?tls=false`
    : `mongodb://${process.env.RATELIMITS_DB_USER}:${process.env.RATELIMITS_DB_PASSWORD}@localhost:${process.env.RATELIMITS_DB_PORT}/?authSource=ratelimits&tls=false`
}

const url = getMongoConnUrl()
const client = new MongoClient(url)

interface RateLimit {
  _id: string
  data: any
}

export default express.Router().all('*', (req, res, next) => {
  const db = client.db('ratelimits')
  const collection = db.collection('ratelimits')
  // const ip = req.socket.remoteAddress ?? req.ip ?? req.socket.localAddress
  const ip = '127.0.0.1'

  client.connect().then(async () => {
    console.log('Connected to MongoDB')
    return await collection.countDocuments({ _id: new ObjectId(ip) })
  }).then(async (count) => {
    console.log(`Count: ${count}`)

    const doc: RateLimit = {
      _id: ip,
      data: {}
    }

    if (count <= 0) {
      return await collection.insertOne(!doc)
    }

    return await collection.updateOne({ _id: new ObjectId(ip) }, { data: {} })
  }).then((result) => {
    console.log(result)
    next()
  }).catch((err) => {
    console.error(err)
    next()
  })
})
