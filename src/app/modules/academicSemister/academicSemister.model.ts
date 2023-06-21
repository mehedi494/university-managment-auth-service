import { Schema, model } from 'mongoose';
import { IAcademicSemister } from './academicSemister.interface';
import {
  academicSeimterMonths,
  academicSemisterCode,
  academicSemisterTitle,
} from './academicSemister.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const AcademicSemisterSchema = new Schema<IAcademicSemister>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemisterTitle,
    },
    year: {
      type: String,
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

AcademicSemisterSchema.pre('save', async function (next) {
  const isExits = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExits) {
    throw new ApiError(httpStatus.CONFLICT, 'This semester Already exits');
  }
  next();
});

export const AcademicSemister = model<IAcademicSemister>(
  'AcademicSemister',
  AcademicSemisterSchema
);
