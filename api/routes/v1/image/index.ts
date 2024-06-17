import express from 'express'
import noise from './noise'

const router = express.Router()

router.use('/noise', noise)

export default router
