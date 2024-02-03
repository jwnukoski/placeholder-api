import { expect, test, describe } from 'bun:test'
import supertest from 'supertest'
import app from '../../../../index'

describe('/api/v1/random/float', () => {
  test('returns 400 when max is too large', async () => {
    const response = await supertest(app)
      .get('/api/v1/random/float?min=0&max=9007199254740992')

    expect(response.status).toBe(400)
  })

  test('returns 400 when min is too large', async () => {
    const response = await supertest(app)
      .get('/api/v1/random/float?min=9007199254740992&max=9007199254740993')

    expect(response.status).toBe(400)
  })

  test('returns 400 when min is larger than max', async () => {
    const response = await supertest(app)
      .get('/api/v1/random/float?min=-3&max=-5')

    expect(response.status).toBe(400)
  })

  test('returns 400 when min is not a number', async () => {
    const response = await supertest(app)
      .get('/api/v1/random/float?min=hello&max=5')

    expect(response.status).toBe(400)
  })

  test('returns 400 when max is not a number', async () => {
    const response = await supertest(app)
      .get('/api/v1/random/float?min=5&max=hello')

    expect(response.status).toBe(400)
  })

  test('returns 200 when min and max are valid', async () => {
    const response = await supertest(app)
      .get('/api/v1/random/float?min=5&max=10')

    expect(response.status).toBe(200)
  })

  test('returns a number between to valid given numbers', async () => {
    const response = await supertest(app)
      .get('/api/v1/random/float?min=5&max=10')

    expect(response.body).toBeGreaterThanOrEqual(5)
    expect(response.body).toBeLessThanOrEqual(10)
  })
})
