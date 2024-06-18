import express from 'express'
import primitive from './primitive/index'
import loremIpsum from './lorem-ipsum/index'
import image from './image/index'

const router = express.Router()

router.use('/lorem-ipsum', loremIpsum)
router.use('/primitive', primitive)
router.use('/image', image)

export default router
