import express from 'express';
const router = express.Router();

import validateRequest from '../../middleware/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudents);
router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

export const StudentsRoutes = router;
