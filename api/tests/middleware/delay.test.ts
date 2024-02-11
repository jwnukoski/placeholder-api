import { expect, test, describe } from 'bun:test'
import supertest from 'supertest'
import app from '../../index'
import { DELAY_MAX } from '../../middleware/delay'

describe('/api/v1/lorem-ipsum/sentences', () => {
  test('doesnt return an X-Delay header when none is provided', async () => {
    const response = await supertest(app).get('/api/v1/lorem-ipsum/sentences')
    expect(response.header).not.toHaveProperty('x-delay')
  })

  test('returns an X-Delay header when one is provided', async () => {
    const response = await supertest(app).get('/api/v1/lorem-ipsum/sentences').set('X-Delay', '1000')
    expect(response.header).toHaveProperty('x-delay')
  })

  test('delays the response when a correct delay is provided', async () => {
    const start = Date.now()
    await supertest(app).get('/api/v1/lorem-ipsum/sentences').set('X-Delay', '1000')
    const end = Date.now()
    expect(end - start).toBeGreaterThanOrEqual(1000)
  })

  test('ignores delay when it is over the max', async () => {
    const start = Date.now()
    await supertest(app).get('/api/v1/lorem-ipsum/sentences').set('X-Delay', `${DELAY_MAX + 1}`)
    const end = Date.now()
    expect(end - start).toBeLessThan(DELAY_MAX + 1)
  })
})
