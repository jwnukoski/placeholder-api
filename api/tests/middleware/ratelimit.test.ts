import { expect, test, describe } from 'bun:test'
import supertest from 'supertest'
import app from '../../index'

describe('/api/v1/lorem-ipsum/sentences', () => {
  test('returns a X-RateLimit-Limit header', async () => {
    const response = await supertest(app).get('/api/v1/lorem-ipsum/sentences')
    expect(response.header).toHaveProperty('x-ratelimit-limit')
  })

  test('returns a X-RateLimit-Remaining header', async () => {
    const response = await supertest(app).get('/api/v1/lorem-ipsum/sentences')
    expect(response.header).toHaveProperty('x-ratelimit-remaining')
  })
})
