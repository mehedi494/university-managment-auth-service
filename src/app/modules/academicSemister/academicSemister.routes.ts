import express from 'express';
import { academicSemisterValidation } from './academicSemister.validation';

import validateRequest from './../../middleware/validateRequest';
import { academicSemisterController } from './academicSemister.controller';
const router = express.Router();

router.post(
  '/create-semister',
  validateRequest(academicSemisterValidation.createAcaemicSemisterValidation),
  academicSemisterController.createSemister
);

export const AcademicSemisterRoutes = router;
