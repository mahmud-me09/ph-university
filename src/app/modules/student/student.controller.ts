import { catchAsync } from '../../utils/catchAsync';
import { successResponse } from '../../utils/sendResponse';
import { StudentServices } from './student.service';
import httpStatusCodes from 'http-status-codes';

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  successResponse(res, {
    statusCode: httpStatusCodes.OK,
    success: true,
    message: 'Student is retrieved succesfully',
    data: result,
  });
});

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();

  successResponse(res, {
    statusCode: httpStatusCodes.OK,
    success: true,
    message: 'Student are retrieved succesfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  successResponse(res, {
    statusCode: httpStatusCodes.OK,
    success: true,
    message: 'Student is deleted succesfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
