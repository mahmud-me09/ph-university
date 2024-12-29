import { Schema, model } from 'mongoose';
import { TSemesterRegistration } from './registration.interface';
import { SemesterRegistrationStatus } from './registration.constant';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: SemesterRegistrationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  { timestamps: true },
);

export const SemesterRegistrationModel = model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
