import { expect, test, describe } from 'bun:test'
import supertest from 'supertest'
import app from '../../../../index'
import { MAX_SENTENCES, MAX_WORDS_PER_SENTENCE } from '../../../../routes/v1/lorem-ipsum/sentences'

describe('/api/v1/lorem-ipsum/sentences', () => {
  test('returns 400 when count is too large', async () => {
    const response = await supertest(app)
      .get(`/api/v1/lorem-ipsum/sentences?count=${MAX_SENTENCES + 1}`)

    expect(response.status).toBe(400)
  })

  test('returns 400 when count is too small', async () => {
    const response = await supertest(app)
      .get('/api/v1/lorem-ipsum/sentences?count=0')

    expect(response.status).toBe(400)
  })

  test('returns 400 when count is not a number', async () => {
    const response = await supertest(app)
      .get('/api/v1/lorem-ipsum/sentences?count=hello')

    expect(response.status).toBe(400)
  })

  test('returns 400 when max words per sentence is too large', async () => {
    const response = await supertest(app)
      .get(`/api/v1/lorem-ipsum/sentences?max=${MAX_WORDS_PER_SENTENCE + 1}`)

    expect(response.status).toBe(400)
  })

  test('returns 400 when max word per sentence is too small', async () => {
    const response = await supertest(app)
      .get('/api/v1/lorem-ipsum/sentences?max=0')

    expect(response.status).toBe(400)
  })

  test('returns 400 when max word per sentence is not a number', async () => {
    const response = await supertest(app)
      .get('/api/v1/lorem-ipsum/sentences?max=hello')

    expect(response.status).toBe(400)
  })

  test('returns 400 when min words per sentence is too large', async () => {
    const response = await supertest(app)
      .get(`/api/v1/lorem-ipsum/sentences?min=${MAX_WORDS_PER_SENTENCE + 1}`)

    expect(response.status).toBe(400)
  })

  test('returns 400 when min word per sentence is too small', async () => {
    const response = await supertest(app)
      .get('/api/v1/lorem-ipsum/sentences?min=0')

    expect(response.status).toBe(400)
  })

  test('returns 400 when min is greater than max', async () => {
    const response = await supertest(app)
      .get('/api/v1/lorem-ipsum/sentences?min=5&max=4')

    expect(response.status).toBe(400)
  })

  test('returns 400 when min word per sentences is not a number', async () => {
    const response = await supertest(app)
      .get('/api/v1/lorem-ipsum/sentences?min=hello')

    expect(response.status).toBe(400)
  })
})
