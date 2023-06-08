import { z } from 'zod';
import {
  academicSeimterMonths,
  academicSemisterCode,
  academicSemisterTitle,
} from './academicSemister.constant';

const createAcaemicSemisterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemisterTitle] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.number({
      required_error: 'Year is Required',
    }),
    code: z.enum([...academicSemisterCode] as [string, ...string[]], {
      required_error: 'Year is Required',
    }),
    startMonth: z.enum([...academicSeimterMonths] as [string, ...string[]], {
      required_error: 'Start month is neeeded',
    }),
    endMonth: z.enum([...academicSeimterMonths] as [string, ...string[]], {
      required_error: 'End month is neeeded',
    }),
  }),
});

export const academicSemisterValidation = {
  createAcaemicSemisterValidation: createAcaemicSemisterZodSchema,
};
