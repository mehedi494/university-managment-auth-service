import {
  IAcademicSemisterCodes,
  IAcademicSemisterMonths,
  IAcademicSemisterTitles,
} from './academicSemister.interface';

export const academicSeimterMonths: IAcademicSemisterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemisterTitle: IAcademicSemisterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemisterCode: IAcademicSemisterCodes[] = [
  '01',
  '02',
  '03',
];

export const academicSemisterTitleMaper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
export const academicSearchableFields = ['title', 'code', 'year'];
export const academicSemisterGFilterbableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
];
