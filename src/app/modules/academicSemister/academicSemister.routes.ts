import express from 'express';
import { academicSemisterValidation } from './academicSemister.validation';

import validateRequest from './../../middleware/validateRequest';
import { AcademicSemisterController } from './academicSemister.controller';
const router = express.Router();

router.post(
  '/create-semister',
  validateRequest(academicSemisterValidation.createAcademicSemisterZodSchema),
  AcademicSemisterController.createSemister
);

router.get('/:id', AcademicSemisterController.getSemesterById);
router.get('/get-all', AcademicSemisterController.getAllSemester);
router.patch(
  '/:id',
  validateRequest(academicSemisterValidation.updateAcademicSemestrerZodSchema),
  AcademicSemisterController.updateSemester
);
router.delete('/:id', AcademicSemisterController.deleteSemester);

export const AcademicSemisterRoutes = router;
