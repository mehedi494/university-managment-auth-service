import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAcdemicSemister } from './academicSemister.interface';
import { AcademicSemister } from './academicSemister.model';
import { academicSemisterTitleMaper } from './academicSemister.constant';

const createSemister = async (
  payload: IAcdemicSemister
): Promise<IAcdemicSemister> => {
  if (academicSemisterTitleMaper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Semester are not  Valid');
  }
  const result = await AcademicSemister.create(payload);
  return result;
};

export const academicSemisterService = {
  createSemister,
};
