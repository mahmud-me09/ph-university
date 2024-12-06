import TAcademySemester from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payLoad:TAcademySemester)=>{
    const result = await AcademicSemesterModel.create(payLoad)
    return result
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
}