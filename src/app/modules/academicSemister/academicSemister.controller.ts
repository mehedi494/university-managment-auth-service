import { Request, Response } from 'express';
import { academicSemisterService } from './academicSemister.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationField } from '../../../constanse/paginationField';
import { IAcademicSemister } from './academicSemister.interface';
import { academicSemisterGFilterbableFields } from './academicSemister.constant';

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

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, academicSemisterGFilterbableFields);
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
});
const getSemesterById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicSemisterService.getSemisterById(id);

  sendResponse<IAcademicSemister>(res, {
    success: true,
    message: 'Semester retrivied Successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await academicSemisterService.updateSemester(id, updateData);

  sendResponse<IAcademicSemister>(res, {
    success: true,
    message: 'Semester update Successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await academicSemisterService.deleteSemester(id);

  sendResponse<IAcademicSemister>(res, {
    success: true,
    message: 'Semester deleted Successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const academicSemisterController = {
  createSemister,
  getAllSemester,
  getSemesterById,
  updateSemester,
  deleteSemester,
};