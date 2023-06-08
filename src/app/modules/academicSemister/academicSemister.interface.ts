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

export type IAcdemicSemister = {
  title: IAcademicSemisterTitles;
  year: number;
  code: IAcademicSemisterCodes;
  startMonth: IAcademicSemisterMonths;
  endMonth: IAcademicSemisterMonths;
};

export type AcaemicSemisterModel = Model<IAcdemicSemister>;
