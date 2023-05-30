import { Request, Response } from 'express'
import userService from './user.service'
const createuser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await userService.createUser(user)
    res.status(200).json({
      status: 'success',
      message: 'user created succefully',
      data: result,
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      message: 'faild  to create user!',
      error: err,
    })
  }
}

export default {
  createuser,
}
