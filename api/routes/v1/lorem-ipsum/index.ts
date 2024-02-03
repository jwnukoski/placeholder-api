// api/v1
import express from 'express'
import paragraph from './paragraph'
import sentence from './sentence'
import words from './words'

const router = express.Router()

router.use('/paragraph', paragraph)
router.use('/sentence', sentence)
router.use('/words', words)

export default router
