import { RequestHandler } from 'express'
import { userService } from './user.service'

const createuser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await userService.createUser(user)
    res.status(200).json({
      status: 'success',
      message: 'user created succefully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const userController = { createuser }
