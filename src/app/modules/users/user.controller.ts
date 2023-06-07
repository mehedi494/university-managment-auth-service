import { RequestHandler } from 'express'
import { userService } from './user.service'
import { z } from 'zod'
const createuser: RequestHandler = async (req, res, next) => {
  try {
    const createZodSchema = z.object({
      body: z.object({
        role: z.string({
          required_error: 'role is Required',
        }),
        password: z.string().optional(),
      }),
    })

    await createZodSchema.parseAsync(req)

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
