// api/v1/random
import express from 'express'
import int from './int'
import float from './float'
import boolean from './boolean'

const router = express.Router()

router.use('/int', int)
router.use('/float', float)
router.use('/boolean', boolean)

export default router
