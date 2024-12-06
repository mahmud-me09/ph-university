import { Schema, model, ObjectId } from 'mongoose';
import TAcademySemester from './academicSemester.interface';
import { academicSemesterCode, academicSemesterName, months } from './academicSemester.constant';



const AcademicSemesterSchema = new Schema<TAcademySemester>(
  {
    name: { type: String, enum: academicSemesterName, required: true },
    year: { type: String, required: true },
    code: { type: String, enum: academicSemesterCode, required: true },
    startMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: months,
      required: true,
    },
  },
  { timestamps: true },
);

export const AcademicSemesterModel = model<TAcademySemester>(
  'AcademicSemester',
  AcademicSemesterSchema,
);