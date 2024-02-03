import { expect, test, describe } from 'bun:test'
import supertest from 'supertest'
import app from '../../../../index'
import { MAX_WIDTH, MAX_HEIGHT, MAX_QUALITY } from '../../../../routes/v1/random/image'

describe('/api/v1/random/image', () => {
  test(`returns 400 when width exceed ${MAX_WIDTH}`, async () => {
    const response = await supertest(app)
      .get(`/api/v1/random/image?width=${MAX_WIDTH + 1}`)

    expect(response.status).toBe(400)
  })

  test('returns 400 when width is below 1', async () => {
    const response = await supertest(app)
      .get('/api/v1/random/image?width=0')

    expect(response.status).toBe(400)
  })

  test(`returns 400 when height exceed ${MAX_HEIGHT}`, async () => {
    const response = await supertest(app)
      .get(`/api/v1/random/image?height=${MAX_HEIGHT + 1}`)

    expect(response.status).toBe(400)
  })

  test('returns 400 when height is below 1', async () => {
    const response = await supertest(app)
      .get('/api/v1/random/image?height=0')

    expect(response.status).toBe(400)
  })

  test('returns 400 when quality is below 1', async () => {
    const response = await supertest(app)
      .get('/api/v1/random/image?quality=0')

    expect(response.status).toBe(400)
  })

  test(`returns 400 when quality is above ${MAX_QUALITY}`, async () => {
    const response = await supertest(app)
      .get(`/api/v1/random/image?quality=${MAX_QUALITY + 1}`)

    expect(response.status).toBe(400)
  })

  test('returns an image when given correct parameters', async () => {
    const response = await supertest(app)
      .get('/api/v1/random/image?width=1920&height=1080&quality=50')

    expect(response.status).toBe(200)
    expect(response.header['content-type']).toBe('image/jpeg')
  })

  test('returns an image when given no parameters', async () => {
    const response = await supertest(app)
      .get('/api/v1/random/image')

    expect(response.status).toBe(200)
    expect(response.header['content-type']).toBe('image/jpeg')
  })
})
