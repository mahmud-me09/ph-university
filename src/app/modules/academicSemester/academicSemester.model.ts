import { Schema, model, ObjectId } from 'mongoose';
import TAcademicSemester from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.constant';

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
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

AcademicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExist) {
    throw new Error('Semester Already Exists.');
  }
});

export const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema,
);
