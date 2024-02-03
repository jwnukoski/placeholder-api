import { expect, test, describe } from 'bun:test'
import supertest from 'supertest'
import app from '../../../../index'

describe('/api/v1/random/boolean', () => {
  test('returns a 200 every time', async () => {
    const response = await supertest(app)
      .get('/api/v1/random/boolean')

    expect(response.status).toBe(200)
  })

  test('returns a boolean', async () => {
    const response = await supertest(app)
      .get('/api/v1/random/boolean')

    expect(response.body).toBe(true || false)
  })
})
