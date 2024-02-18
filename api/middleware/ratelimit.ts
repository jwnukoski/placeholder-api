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
const MAX_IP_REQUESTS = getMaxIpRequests()

/**
  * @openapi
  * X-RateLimit-Limit:
  *  head:
  *   tags: [Middleware]
  *   summary: Usage by IP address.
  *   description: Contains usage statistics by IP.
  *   parameters:
  *     - in: header
  *       name: X-Delay
  *       description: Number of milliseconds to delay the response.
  *       schema:
  *         type: number
  *         minimum: 0
  *         maximum: 5000
  *         default: 0
  *   responses:
  *     '200':
  *       description: Headers containing usage statistics.
  *       content:
  *         plain/text:
  *           schema:
  *             type: string
  *             example: X-RateLimit-IP, X-RateLimit-Limit, X-RateLimit-Remaining
  *     '429':
  *       description: Max requests reached for the IP. No more requests allowed.
  *       content:
  *         plain/text:
  *           schema:
  *             type: string
  *             example: Max requests reached for {ip}
  *     '500':
  *       description: Internal server error.
  *       content:
  *         plain/text:
  *           schema:
  *             type: string
  *             example: Internal server error.
 */
export default express.Router().all('*', (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? req.ip ?? req.socket.localAddress
  res.setHeader('X-RateLimit-IP', `${ip}`)
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
  return process.env.NODE_ENV === 'development'
    ? `mongodb://${process.env.RATELIMITS_DB_USER}:${process.env.RATELIMITS_DB_PASSWORD}@localhost:${process.env.RATELIMITS_DB_PORT}/ratelimits?authSource=ratelimits&tls=false`
    : `mongodb://${process.env.RATELIMITS_DB_USER}:${process.env.RATELIMITS_DB_PASSWORD}@ratelimits-db:27017/ratelimits?tls=false`
}

function getMaxIpRequests (): number {
  return process.env.NODE_ENV === 'production'
    ? Number(process.env.RATELIMITS_IP_LIMIT)
    : Number.MAX_SAFE_INTEGER
}
