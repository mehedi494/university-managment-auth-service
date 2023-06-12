import { NextFunction, Request, Response } from 'express';
import { academicSemisterService } from './academicSemister.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationField } from '../../../constanse/paginationField';
import { IAcademicSemister } from './academicSemister.interface';

const createSemister = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body;
  const result = await academicSemisterService.createSemister(
    academicSemesterData
  );

  sendResponse<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Aademic semester created successfully!',
    data: result,
  });
});

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filter = pick(req.query, ['searchTerm']);
    const paginationOptions = pick(req.query, paginationField);

    const result = await academicSemisterService.getAllSemesters(
      filter,
      paginationOptions
    );

    sendResponse<IAcademicSemister[]>(res, {
      success: true,
      message: 'Semester retrivied Successfully',
      statusCode: httpStatus.OK,
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

export const academicSemisterController = {
  createSemister,
  getAllSemester,
};
