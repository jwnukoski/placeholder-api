import express from 'express'
import fs from 'fs'
import imgGen from 'js-image-generator'
import { v4 as uuidv4 } from 'uuid'

export const MAX_WIDTH = 1920
export const MAX_HEIGHT = 1080
export const MAX_QUALITY = 100

/**
  * @openapi
  * /api/v1/image/noise:
  *  get:
  *   tags: [Image]
  *   summary: Noise
  *   description: Returns a random noise image.
  *   parameters:
  *     - in: query
  *       name: width
  *       required: false
  *       description: The width of the image.
  *       schema:
  *         type: number
  *         minimum: 1
  *         maximum: 1920
  *         default: 24
  *     - in: query
  *       name: height
  *       required: false
  *       description: The height of the image.
  *       schema:
  *         type: number
  *         minimum: 1
  *         maximum: 1080
  *         default: 24
  *     - in: query
  *       name: quality
  *       required: false
  *       description: The quality of the image.
  *       schema:
  *         type: number
  *         minimum: 1
  *         maximum: 100
  *         default: 80
  *   responses:
  *     '200':
  *       description: A random noise jpeg.
  *       content:
  *         image/jpeg:
  *           schema:
  *             type: string
  *             example: noise.jpg
  *     '400':
  *       description: Bad request
  *       content:
  *         plain/text:
  *           schema:
  *             type: string
  *             example: Width must be between 1 and 1920
  *     '500':
  *       description: Internal server error
  *       content:
  *         plain/text:
  *           schema:
  *             type: string
  *             example: Failed to generate image
 */
export default express.Router().get('/', (req, res) => {
  let width: number = 24
  let height: number = 24
  let quality: number = 80

  if (req?.query?.width !== undefined) {
    width = Number(req.query.width)
  }

  if (req?.query?.height !== undefined) {
    height = Number(req.query.height)
  }

  if (req?.query?.quality !== undefined) {
    quality = Number(req.query.quality)
  }

  if (Number.isNaN(width)) {
    res.status(400).send('Invalid width')
    return
  }

  if (Number.isNaN(height)) {
    res.status(400).send('Invalid height')
    return
  }

  if (Number.isNaN(quality)) {
    res.status(400).send('Invalid quality')
    return
  }

  if (width < 1 || width > MAX_WIDTH) {
    res.status(400).send(`Width must be between 1 and ${MAX_WIDTH}`)
    return
  }

  if (height < 1 || height > MAX_HEIGHT) {
    res.status(400).send(`Height must be between 1 and ${MAX_HEIGHT}`)
    return
  }

  if (quality < 1 || quality > MAX_QUALITY) {
    res.status(400).send(`Quality must be between 1 and ${MAX_QUALITY}`)
    return
  }

  // Create image
  const randomFilePath: string = new URL(`../../../temp/images/${uuidv4()}.jpg`, import.meta.url).pathname
  let wroteImage: boolean = false

  imgGen.generateImage(width, height, quality, (err, image) => {
    if (err !== null) {
      res.status(500).send('Failed to generate image')
      return
    }

    try {
      fs.writeFileSync(randomFilePath, image.data as Buffer)
      wroteImage = true
    } catch (e) {
      res.status(500).send('Failed to generate image')
    }
  })

  if (!wroteImage) {
    return
  }

  // Send image
  res.sendFile(randomFilePath, (err) => {
    if (err !== null) {
      res.status(500).send('Failed to send file')
    }

    // Delete image
    try {
      fs.unlink(randomFilePath, () => {})
    } catch (e) {
      console.error(e)
    }
  })
})
