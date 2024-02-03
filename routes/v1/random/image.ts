// api/v1/random/int
import express from 'express'
import fs from 'fs'
import imgGen from 'js-image-generator'
import { v4 as uuidv4 } from 'uuid'

export const MAX_WIDTH = 1920
export const MAX_HEIGHT = 1080

export default express.Router().get('/', (req, res) => {
  const randomFileName = `./temp/images/${uuidv4()}.jpg`
  let width = 24
  let height = 24
  let quality = 80

  if (req?.body?.width !== undefined) {
    width = Number(req.body.width)
  }

  if (req?.body?.height !== undefined) {
    height = Number(req.body.height)
  }

  if (req?.body?.quality !== undefined) {
    quality = Number(req.body.quality)
  }

  if (Number.isNaN(width)) {
    return res.status(400).json({ error: 'Invalid width' })
  }

  if (Number.isNaN(height)) {
    return res.status(400).json({ error: 'Invalid height' })
  }

  if (Number.isNaN(quality)) {
    return res.status(400).json({ error: 'Invalid quality' })
  }

  if (width < 1 || width > MAX_WIDTH) {
    return res.status(400).json({ error: `Width must be between 1 and ${MAX_WIDTH}` })
  }

  if (height < 1 || height > MAX_HEIGHT) {
    return res.status(400).json({ error: `Height must be between 1 and ${MAX_HEIGHT}` })
  }

  if (quality < 1 || quality > 100) {
    return res.status(400).json({ error: 'Quality must be between 1 and 100' })
  }

  // Generate one image
  imgGen.generateImage(width, height, quality, (err, image) => {
    if (err !== null) {
      return res.status(500).json({ error: 'Failed to generate image' })
    }

    fs.writeFileSync(randomFileName, image.data as Buffer)
  })

  res.sendFile(randomFileName, (err) => {
    if (err !== null) {
      res.status(500).json({ error: 'Failed to send file' })
    }

    fs.unlink(randomFileName, () => {})
  })
})
