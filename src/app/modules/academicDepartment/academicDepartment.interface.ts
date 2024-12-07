import { Types } from "mongoose";

interface TAcademicDepartment {
    name:string;
    academicFaculty:Types.ObjectId;
}

export default TAcademicDepartment;