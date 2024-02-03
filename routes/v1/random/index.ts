// api/v1/random
import express from 'express'
import int from './int'
import float from './float'
import boolean from './boolean'
import image from './image'

const router = express.Router()

router.use('/int', int)
router.use('/float', float)
router.use('/boolean', boolean)
router.use('/image', image)

export default router
