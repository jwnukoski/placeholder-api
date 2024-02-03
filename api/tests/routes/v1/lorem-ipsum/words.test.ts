import { expect, test, describe } from 'bun:test'
import supertest from 'supertest'
import app from '../../../../index'
import { MAX_WORDS } from '../../../../routes/v1/lorem-ipsum/words'

describe('/api/v1/lorem-ipsum/words', () => {
  test('returns 400 when count is too large', async () => {
    const response = await supertest(app)
      .get(`/api/v1/lorem-ipsum/words?count=${MAX_WORDS + 1}`)

    expect(response.status).toBe(400)
  })

  test('returns 400 when count is too small', async () => {
    const response = await supertest(app)
      .get('/api/v1/lorem-ipsum/words?count=0')

    expect(response.status).toBe(400)
  })

  test('returns 400 when count is not a number', async () => {
    const response = await supertest(app)
      .get('/api/v1/lorem-ipsum/words?count=hello')

    expect(response.status).toBe(400)
  })

  test('returns a single words when no count is given', async () => {
    const response = await supertest(app)
      .get('/api/v1/lorem-ipsum/words')

    expect(response.status).toBe(200)
    expect(response.body).toBeString()
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body.split(' ')).toHaveLength(1)
  })

  test('returns the correct amount of words when given a count', async () => {
    const response = await supertest(app)
      .get('/api/v1/lorem-ipsum/words?count=5')

    expect(response.status).toBe(200)
    expect(response.body).toBeString()
    expect(response.body.split(' ')).toHaveLength(5)
  })
})
