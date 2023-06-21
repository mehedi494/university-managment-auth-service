/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  IAcademicSemister,
  IAcademicSemisterFilters,
} from './academicSemister.interface';
import { AcademicSemister } from './academicSemister.model';
import {
  academicSearchableFields,
  academicSemisterTitleMaper,
} from './academicSemister.constant';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { SortOrder } from 'mongoose';

const createSemister = async (
  payload: IAcademicSemister
): Promise<IAcademicSemister> => {
  if (academicSemisterTitleMaper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Semester are not  Valid');
  }
  const result = await AcademicSemister.create(payload);

  return result;
};

const getAllSemesters = async (
  filters: IAcademicSemisterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicSearchableFields.map(field => ({
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
  /*   const andConditions = [
    {
      $or: [
        {
          title: {
            $regex: searchTerm,
            $options: 'i',
          },
        },
        {
          code: {
            $regex: searchTerm,
             $options: 'i',
          },
        },
        {
          year: {
            $regex: searchTerm,
            $options: 'i',
          },
        },
      ],
    },
  ]; */
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereConditon = andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await AcademicSemister.find(whereConditon)
    .skip(skip)
    .limit(limit)
    .sort(sortCondition);
  const total = await AcademicSemister.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSemisterById = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const result = await AcademicSemister.findById(id);
  return result;
};
const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemister>
): Promise<IAcademicSemister | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemisterTitleMaper[payload.title] !== payload.code
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'SEMESTER TITLE AND CODE ARE NOT VALID'
    );
  }
  const result = await AcademicSemister.findOneAndUpdate({ _id: id }, payload);
  return result;
};
const deleteSemester = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const result = await AcademicSemister.findByIdAndDelete(id);
  return result;
};

export const academicSemisterService = {
  createSemister,
  getAllSemesters,
  getSemisterById,
  updateSemester,
  deleteSemester,
};
