import httpStatus from 'http-status';
import { IGenericErrorResponse } from '../interfaces/common';
import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';

const handleCastError = (
  error: mongoose.Error.CastError
): IGenericErrorResponse => {
  const statusCode = httpStatus.BAD_GATEWAY;
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: `Invalid ${error.path}`,
    },
  ];
  return {
    statusCode,
    message: 'CastError',
    errorMessages: errors,
  };
};

export default handleCastError;
