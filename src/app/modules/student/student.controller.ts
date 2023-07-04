import { Request, Response } from 'express';

import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IStudent } from './student.interface';
import { studentFilterableFields } from './student.constant';
import { StudentService } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  {
    // {searchTerm: 14000}
  }
  const result = await StudentService.getAllStudents(filter, paginationOptions);

  sendResponse<IStudent[]>(res, {
    success: true,
    message: 'Student retrivied Successfully',
    statusCode: httpStatus.OK,
    meta: result.meta,
    data: result.data,
  });
});
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.getSingleStudents(id);

  sendResponse<IStudent>(res, {
    success: true,
    message: 'Student retrivied Successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await StudentService.updateStudent(id, updateData);

  sendResponse<IStudent>(res, {
    success: true,
    message: 'Student update Successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentService.deleteStudent(id);

  sendResponse<IStudent>(res, {
    success: true,
    message: 'Student deleted Successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
