import { Schema, model } from 'mongoose';
import {
  AcaemicSemisterModel,
  IAcdemicSemister,
} from './academicSemister.interface';
import {
  academicSeimterMonths,
  academicSemisterCode,
  academicSemisterTitle,
} from './academicSemister.constant';
import ApiError from '../../../errors/ApiError';

const AcademicSemisterSchema = new Schema<IAcdemicSemister>({
  title: {
    type: String,
    required: true,
    enum: academicSemisterTitle,
  },
  year: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: academicSemisterCode,
  },
  startMonth: {
    type: String,
    required: true,
    enum: academicSeimterMonths,
  },
  endMonth: {
    type: String,
    required: true,
    enum: academicSeimterMonths,
  },
});

AcademicSemisterSchema.pre('save', async function (next) {
  const isExits = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExits) {
    throw new ApiError(409, 'This semester Already exits');
  } else {
    next();
  }
});

export const AcademicSemister = model<IAcdemicSemister, AcaemicSemisterModel>(
  'AcademicSemister',
  AcademicSemisterSchema
);
