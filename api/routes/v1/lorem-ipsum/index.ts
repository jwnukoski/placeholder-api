import express from 'express'
import paragraph from './paragraph'
import sentences from './sentences'
import words from './words'

const router = express.Router()

router.use('/paragraph', paragraph)
router.use('/sentences', sentences)
router.use('/words', words)

export default router
