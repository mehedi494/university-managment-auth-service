import { RequestHandler } from 'express';
import { academicSemisterService } from './academicSemister.service';

const createSemister: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body;

    const result = await academicSemisterService.createSemister(payload);
    res.status(200).json({
      success: true,
      message: 'Semister Create Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const academicSemisterController = {
  createSemister,
};
