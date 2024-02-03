// api/v1/random/int
import express from 'express'
import fs from 'fs'
import imgGen from 'js-image-generator'
import { v4 as uuidv4 } from 'uuid'

export const MAX_WIDTH = 1920
export const MAX_HEIGHT = 1080

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
    res.status(400).json({ error: 'Invalid width' })
    return
  }

  if (Number.isNaN(height)) {
    res.status(400).json({ error: 'Invalid height' })
    return
  }

  if (Number.isNaN(quality)) {
    res.status(400).json({ error: 'Invalid quality' })
    return
  }

  if (width < 1 || width > MAX_WIDTH) {
    res.status(400).json({ error: `Width must be between 1 and ${MAX_WIDTH}` })
    return
  }

  if (height < 1 || height > MAX_HEIGHT) {
    res.status(400).json({ error: `Height must be between 1 and ${MAX_HEIGHT}` })
    return
  }

  if (quality < 1 || quality > 100) {
    res.status(400).json({ error: 'Quality must be between 1 and 100' })
    return
  }

  // Create image
  const randomFilePath: string = new URL(`../../../temp/images/${uuidv4()}.jpg`, import.meta.url).pathname
  let wroteImage: boolean = false

  imgGen.generateImage(width, height, quality, (err, image) => {
    if (err !== null) {
      res.status(500).json({ error: 'Failed to generate image' })
      return
    }

    try {
      fs.writeFileSync(randomFilePath, image.data as Buffer)
      wroteImage = true
    } catch (e) {
      res.status(500).json({ error: 'Failed to generate image' })
    }
  })

  if (!wroteImage) {
    return
  }

  // Send image
  res.sendFile(randomFilePath, (err) => {
    if (err !== null) {
      res.status(500).json({ error: 'Failed to send file' })
    }

    // Delete image
    try {
      fs.unlink(randomFilePath, () => {})
    } catch (e) {
      console.error(e)
    }
  })
})
