import express from 'express';
import { userRoutes } from '../modules/users/user.routes';
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemister.routes';
const router = express.Router();

const moduleRoute = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/academic-semisters',
    route: AcademicSemisterRoutes,
  },
];

moduleRoute.forEach(module => router.use(module.path, module.route));

export const routers = router;