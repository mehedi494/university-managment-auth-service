/* eslint-disable no-console */
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { SortOrder } from 'mongoose';
import { IStudent, IStudentFilters } from './student.interface';
import { studentSearchableFields } from './student.constant';
import { Student } from './student.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([filed, value]) => ({
        [filed]: value,
      })),
    });
  }

  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereConditon = andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Student.find(whereConditon)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .skip(skip)
    .limit(limit)
    .sort(sortCondition);
  const total = await Student.countDocuments(whereConditon);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudents = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};
const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  const { name, guardian, localGuardian, ...studentData } = payload;
  const updatedStudentData: Partial<IStudent> = { ...studentData };

  // Dynamically handle
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });
  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

export const StudentService = {
  getAllStudents,
  getSingleStudents,
  updateStudent,
  deleteStudent,
};
