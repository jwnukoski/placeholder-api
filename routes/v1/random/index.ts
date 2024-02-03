// api/v1/random
import express from 'express'
import int from './int'

const router = express.Router()

router.use('/int', int)

export default router
