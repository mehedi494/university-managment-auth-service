import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFacaulty/academicFaculty.interfaces';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interfaces';
import { IAcademicSemister } from '../academicSemister/academicSemister.interface';

type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

type Gurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

type Localgurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IStudent = {
  id: string;
  name: UserName;

  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'AB+' | 'AB-' | 'B+' | 'B-' | 'O+' | 'O-';
  guardian: Gurdian;
  localGuardian: Localgurdian;
  academicSemester: Types.ObjectId | IAcademicSemister;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  profileImage?: string;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;

export type IStudentFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  email?: string;
};
