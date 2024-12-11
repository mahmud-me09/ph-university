import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { StudentServices } from './student.service';
import httpStatusCodes from 'http-status-codes';

const getAllStudents = catchAsync(async (req, res) => {
  
  const result = await StudentServices.getAllStudentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatusCodes.OK,
    success: true,
    message: 'Student are retrieved succesfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatusCodes.OK,
    success: true,
    message: 'Student is retrieved succesfully',
    data: result,
  });
});



const updateStudent = catchAsync(async (req, res)=>{
const { id } = req.params;
const {student} = req.body;
const result = await StudentServices.updateStudentIntoDB(id, student);

sendResponse(res, {
  statusCode: httpStatusCodes.OK,
  success: true,
  message: 'Student is updated succesfully',
  data: result,
});
})

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatusCodes.OK,
    success: true,
    message: 'Student is deleted succesfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
