import { Model } from 'mongoose';

export type IAcademicSemisterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemisterTitles = 'Autumn' | 'Summer' | 'Fall';

export type IAcademicSemisterCodes = '01' | '02' | '03';

export type IAcademicSemister = {
  title: IAcademicSemisterTitles;
  year: string;
  code: IAcademicSemisterCodes;
  startMonth: IAcademicSemisterMonths;
  endMonth: IAcademicSemisterMonths;
};

export type IAcademicSemisterFilters = {
  searchTerm?: string;
};
export type AcaemicSemisterModel = Model<IAcademicSemister>;
