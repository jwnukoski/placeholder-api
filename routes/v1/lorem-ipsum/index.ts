// api/v1
import express from 'express'
import paragraph from './paragraph'
import sentence from './sentence'

const router = express.Router()

router.use('/paragraph', paragraph)
router.use('/sentence', sentence)

export default router
