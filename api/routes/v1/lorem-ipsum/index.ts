import express from 'express'
import paragraphs from './paragraph'
import sentences from './sentences'
import words from './words'

const router = express.Router()

router.use('/paragraphs', paragraphs)
router.use('/sentences', sentences)
router.use('/words', words)

export default router
