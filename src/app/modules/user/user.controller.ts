import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import { UserValidation } from './user.validator';
import { successResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: newStudent } = req.body;
    const zodParsedData = UserValidation.userValidationSchema.parse(newStudent);

    const result = await UserService.createStudentIntoDB(password, newStudent);
    
    successResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Student Account Created Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// const createFaculty = async (req: Request, res: Response) => {
//   try {
//     const newStudent = req.body;
//     const zodParsedData = UserValidation.userValidationSchema.parse(newStudent);

//     const result = await UserService.createStudentIntoDB(newStudent);
//     res.status(200).json({
//       message: 'Student Account Created Successfully.',
//       status: true,
//       data: result,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const createAdmin = async (req:Request, res:Response) =>{
//     try{
//         const newStudent = req.body;
//         const zodParsedData = UserValidation.userValidationSchema.parse(newStudent)

//         const result = await UserService.createStudentIntoDB(newStudent);
//         res.status(200).json({
//             message: "Student Account Created Successfully.",
//             status: true,
//             data:result
//         })
//     }catch(error){
//         console.log(error)
//     }
// }

export const UserController = {
  createStudent,
  // createFaculty,
  // createAdmin,
};