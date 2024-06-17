import { expect, test, describe } from 'bun:test'
import supertest from 'supertest'
import app from '../../../../index'

const booleanEndpoint = '/api/v1/primitive/boolean'

describe(booleanEndpoint, () => {
  test('returns a 200 every time', async () => {
    const response = await supertest(app)
      .get(booleanEndpoint)

    expect(response.status).toBe(200)
  })

  test('returns a boolean', async () => {
    const response = await supertest(app)
      .get(booleanEndpoint)

    expect(response.body).toBeBoolean()
  })
})
