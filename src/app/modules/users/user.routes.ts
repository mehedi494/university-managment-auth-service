import express from 'express'
const router = express.Router()
import userControlller from './user.controlller'

router.post('/create-user', userControlller.createuser)

export default router
