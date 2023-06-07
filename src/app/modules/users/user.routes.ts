import express from 'express'
const router = express.Router()
import { userController } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { UserValidation } from './User.validation'

router.post(
  '/create-user',
  validateRequest(UserValidation.createZodSchema),
  userController.createuser
)

export const userRoutes = router
