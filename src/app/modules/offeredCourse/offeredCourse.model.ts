
import { Schema, model } from "mongoose";
import { TOfferedCourse } from "./offeredCourse.interface";
import { Days } from "./offeredCourse.constant";

const offeredCourseSchema = new Schema<TOfferedCourse>(
    {
	semesterRegistration: {
        type: Schema.Types.ObjectId,
        required:true,
        ref:'SemesterRegistration'
    },
  
	academicSemester: {
        type: Schema.Types.ObjectId,
        required:true,
        ref:'AcademicSemester'
    },

	academicFaculty: {
        type: Schema.Types.ObjectId,
        required:true,
        ref:'AcademicFaculty'
    },

	academicDepartment: {
        type: Schema.Types.ObjectId,
        required:true,
        ref:'AcademicDepartment'
    },

	course: {
        type: Schema.Types.ObjectId,
        required:true,
        ref:'Course'
    },

	faculty: {
        type: Schema.Types.ObjectId,
        ref:'Faculty'
    },
	maxCapacity: {
        type: Number,
        required:true,
        default:10
    },
	section: {
        type: Number,
        required:true,
    },
	days: {
        type: String,
        enum: Object.values(Days),
    },
	startTime: {
        type: String,
        required:true,
    },
	endTime: {
        type: String,
        required:true,
    },
})

export const OfferedCourseModel = model<TOfferedCourse>('offeredCourse',offeredCourseSchema)
