// api/v1/random
import express from 'express'

import int from './int'
import float from './float'

const router = express.Router()

router.use('/int', int)
router.use('/float', float)

export default router
