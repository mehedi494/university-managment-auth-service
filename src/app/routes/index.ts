import express from 'express';
import { UserRoutes } from '../modules/users/user.routes';
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemister.routes';

import { AcademicFacultyRoutes } from './../modules/academicFacaulty/academicFaculty.routes';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { StudentsRoutes } from '../modules/student/student.routes';
import { FacultyRoutes } from '../modules/faculty/faculty.routes';
const router = express.Router();

const moduleRoute = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/academic-semisters',
    route: AcademicSemisterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/students',
    route: StudentsRoutes,
  },
];

moduleRoute.forEach(module => router.use(module.path, module.route));
export const routers = router;
