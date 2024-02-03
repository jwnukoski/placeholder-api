// api/v1
import express from 'express'
import random from './random/index'

const router = express.Router()

router.use('/random', random)

export default router
