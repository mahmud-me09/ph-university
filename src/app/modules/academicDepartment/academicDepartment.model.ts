import { Schema, model } from 'mongoose';
import TAcademicDepartment from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: [true, 'Name must be provided'],
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  { timestamps: true },
);

academicDepartmentSchema.pre('findOneAndUpdate', async function (next){
  const query = this.getQuery()

  const isDepartmentExist = !!(await AcademicDepartmentModel.findById(query))

  if(!isDepartmentExist){
    throw new AppError (StatusCodes.NOT_FOUND,"This department does not exist!")
  }
  next()
})

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
