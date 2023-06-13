import { z } from 'zod';
import {
  academicSeimterMonths,
  academicSemisterCode,
  academicSemisterTitle,
} from './academicSemister.constant';

const createAcademicSemisterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemisterTitle] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.string({
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
const updateAcademicSemestrerZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemisterTitle] as [string, ...string[]], {
          required_error: 'title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is Required',
        })
        .optional(),
      code: z
        .enum([...academicSemisterCode] as [string, ...string[]], {
          required_error: 'Year is Required',
        })
        .optional(),
      startMonth: z
        .enum([...academicSeimterMonths] as [string, ...string[]], {
          required_error: 'Start month is neeeded',
        })
        .optional(),
      endMonth: z
        .enum([...academicSeimterMonths] as [string, ...string[]], {
          required_error: 'End month is neeeded',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  );

export const academicSemisterValidation = {
  createAcademicSemisterZodSchema,
  updateAcademicSemestrerZodSchema,
};
