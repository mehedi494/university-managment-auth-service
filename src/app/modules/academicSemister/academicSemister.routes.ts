import express from 'express';
import { academicSemisterValidation } from './academicSemister.validation';

import validateRequest from './../../middleware/validateRequest';
import { academicSemisterController } from './academicSemister.controller';
const router = express.Router();

router.post(
  '/create-semister',
  validateRequest(academicSemisterValidation.createAcademicSemisterZodSchema),
  academicSemisterController.createSemister
);

router.get('/:id', academicSemisterController.getSemesterById);
router.get('/get-all', academicSemisterController.getAllSemester);
router.patch(
  '/:id',
  validateRequest(academicSemisterValidation.updateAcademicSemestrerZodSchema),
  academicSemisterController.updateSemester
);
router.delete('/:id', academicSemisterController.deleteSemester);

export const AcademicSemisterRoutes = router;
