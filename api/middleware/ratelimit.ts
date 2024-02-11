import express from 'express'
import mongoose from 'mongoose'

interface RateLimitModel {
  _id: string
  data: {
    count: number
  }
}

const MONGOOSE_CLIENT = await mongoose.connect(getMongoConnUrl())
const RateLimit = MONGOOSE_CLIENT.model('RateLimit', getRateLimitDataSchema(), 'ips')
const MAX_IP_REQUESTS = Number(process?.env?.RATELIMIT_IP_LIMIT ?? 10000)

// Unregistered users. Limit by IP.
export default express.Router().all('*', (req, res, next) => {
  const ip = req.socket.remoteAddress ?? req.ip ?? req.socket.localAddress
  res.setHeader('X-RateLimit-Limit', `${MAX_IP_REQUESTS}`)

  // check mongo for ip, if one exists increment count, if not create one and set count to 1
  RateLimit.findOne<RateLimitModel>({ _id: ip }).then(async (doc) => {
    if (doc === null) {
      doc = await new RateLimit({
        _id: ip,
        data: {
          count: 0
        }
      }).save()
    }

    if (doc.data.count >= MAX_IP_REQUESTS) {
      res.status(429).send(`Max requests reached for ${ip}`)
      return
    }

    return await RateLimit.updateOne({ _id: ip }, { $inc: { 'data.count': 1 } }).exec()
  }).then(() => {
    return RateLimit.findOne<RateLimitModel>({ _id: ip })
  }).then((doc) => {
    const used = Number(doc?.data?.count ?? -1)

    if (used === -1) {
      res.status(500).send('Internal server error')
      return
    }

    res.setHeader('X-RateLimit-Remaining', `${MAX_IP_REQUESTS - used}`)
  }).catch((err) => {
    console.error(err)
    res.status(500).send('Internal server error')
  }).finally(() => {
    next()
  })
})

function getRateLimitDataSchema (): mongoose.Schema<RateLimitModel> {
  return new mongoose.Schema({
    _id: String,
    data: {
      count: Number
    }
  })
}

function getMongoConnUrl (): string {
  return process.env.NODE_ENV === 'production'
    ? `mongodb://${process.env.RATELIMIT_DB_USER}:${process.env.RATELIMIT_DB_PASSWORD}@ratelimits-db:27017/ratelimits?tls=false`
    : `mongodb://${process.env.RATELIMITS_DB_USER}:${process.env.RATELIMITS_DB_PASSWORD}@localhost:${process.env.RATELIMITS_DB_PORT}/ratelimits?authSource=ratelimits&tls=false`
}
