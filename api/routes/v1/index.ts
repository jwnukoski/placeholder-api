import express from 'express'
import random from './random/index'
import loremIpsum from './lorem-ipsum/index'

const router = express.Router()

router.use('/random', random)
router.use('/lorem-ipsum', loremIpsum)

export default router
