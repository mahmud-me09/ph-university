import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req,res) =>{
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body)

    sendResponse(res, {
        statusCode:StatusCodes.OK,
        success:true,
        message:"Academic Faculty has been created Successfully",
        data:result
    })
})
const getAllAcademicFaculty = catchAsync(async (_req,res) =>{
    const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB()

    sendResponse(res, {
        statusCode:StatusCodes.OK,
        success:true,
        message:"Academic Faculties have been retrieved Successfully",
        data:result
    })
})
const getAAcademicFaculty = catchAsync(async (req,res) =>{
    const {id} = req.params
    const result = await AcademicFacultyServices.getAAcademicFacultyFromDB(id)

    sendResponse(res, {
        statusCode:StatusCodes.OK,
        success:true,
        message:"Academic Semester has been retrieved Successfully",
        data:result
    })
})

const updateAcademicFaculty = catchAsync(async (req, res) =>{
    const {id} = req.params
    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(id,req.body)

    sendResponse(res,{
        statusCode:StatusCodes.OK,
        success:true,
        message:"Academic Faculty has been updated successfully",
        data: result
    })
})

export const AcademicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getAAcademicFaculty,
    updateAcademicFaculty
}
