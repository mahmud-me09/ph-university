import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourseModel } from "./offeredCourse.model";

const createOfferedCourseIntoDB = async (payload:TOfferedCourse)=>{
    const result = await OfferedCourseModel.create(payload)
    return result
}

const getAllOfferedCourseFromDB = async (query:Record<string,unknown>)=>{

}

const getAOfferedCourseFromDB = async (id:string)=>{

}

const updateOfferedCourseIntoDB = async (id:string, payload:TOfferedCourse)=>{

}

export const OfferedCourseService = {
    createOfferedCourseIntoDB,
    getAOfferedCourseFromDB,
    getAllOfferedCourseFromDB,
    updateOfferedCourseIntoDB
}