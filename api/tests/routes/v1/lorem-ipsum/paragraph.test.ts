import { expect, test, describe } from 'bun:test'
import supertest from 'supertest'
import app from '../../../../index'
import { MAX_SENTENCES, MAX_WORDS_PER_SENTENCE } from '../../../../routes/v1/lorem-ipsum/sentences'
import { MAX_PARAGRAPHS } from '../../../../routes/v1/lorem-ipsum/paragraph'

describe('/api/v1/lorem-ipsum/sentences', () => {
  test('returns a 400 when count is invalid', async () => {
    let response = await supertest(app).get('/api/v1/lorem-ipsum/paragraphs?count=0')
    expect(response.status).toBe(400)

    response = await supertest(app).get(`/api/v1/lorem-ipsum/paragraphs?count=${MAX_PARAGRAPHS + 1}`)
    expect(response.status).toBe(400)

    response = await supertest(app).get('/api/v1/lorem-ipsum/paragraphs?count=invalid')
    expect(response.status).toBe(400)
  })

  test('returns a 400 when min_wps is invalid', async () => {
    let response = await supertest(app).get('/api/v1/lorem-ipsum/paragraphs?min_wps=0')
    expect(response.status).toBe(400)

    response = await supertest(app).get('/api/v1/lorem-ipsum/paragraphs?min_wps=invalid')
    expect(response.status).toBe(400)

    response = await supertest(app).get(`/api/v1/lorem-ipsum/paragraphs?min_wps=${MAX_WORDS_PER_SENTENCE + 1}`)
    expect(response.status).toBe(400)

    // response = await supertest(app).get('api/v1/lorem-ipsum/paragraphs?min_wps=12&max_wps=10')
    // expect(response.status).toBe(400)
  })

  test('returns a 400 when min_spp is invalid', async () => {
    let response = await supertest(app).get('/api/v1/lorem-ipsum/paragraphs?min_spp=0')
    expect(response.status).toBe(400)

    response = await supertest(app).get('/api/v1/lorem-ipsum/paragraphs?min_spp=invalid')
    expect(response.status).toBe(400)

    response = await supertest(app).get(`/api/v1/lorem-ipsum/paragraphs?min_spp=${MAX_SENTENCES + 1}`)
    expect(response.status).toBe(400)

    // response = await supertest(app).get('api/v1/lorem-ipsum/paragraphs?min_spp=12&max_spp=10')
    // expect(response.status).toBe(400)
  })

  test('returns a 400 when max_spp is invalid', async () => {
    let response = await supertest(app).get('/api/v1/lorem-ipsum/paragraphs?max_spp=0')
    expect(response.status).toBe(400)

    response = await supertest(app).get('/api/v1/lorem-ipsum/paragraphs?max_spp=invalid')
    expect(response.status).toBe(400)

    response = await supertest(app).get(`/api/v1/lorem-ipsum/paragraphs?max_spp=${MAX_SENTENCES + 1}`)
    expect(response.status).toBe(400)

    // response = await supertest(app).get('api/v1/lorem-ipsum/paragraphs?min_spp=10&max_spp=12')
    // expect(response.status).toBe(400)
  })

  test('returns a valid data set when given correct parameters', async () => {
    // Hard to test how random this is, but we can at least test that it returns a 200
    const response = await supertest(app).get('/api/v1/lorem-ipsum/paragraphs?count=5&min_wps=3&max_wps=5&min_spp=3&max_spp=5')

    expect(response.status).toBe(200)
  })

  test('returns valid data when given strict parameters', async () => {
    const response = await supertest(app).get('/api/v1/lorem-ipsum/paragraphs?count=1&min_wps=1&max_wps=1&min_spp=1&max_spp=1')

    expect(response.status).toBe(200)
    expect(response.body.split('.').length).toBe(2)
  })
})
