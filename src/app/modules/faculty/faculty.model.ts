import { Schema, model } from 'mongoose';
import { IFaculty, TFaculty } from './faculty.interface';

const facultySchema = new Schema<TFaculty, IFaculty>(
  {
    id: { type: String, required: [true, 'ID is required.'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      message: [true, 'User ID is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      firstName: { type: String, required: [true, 'First Name Required'] },
      middleName: { type: String },
      lastName: { type: String, required: [true, 'Last Name Required'] },
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['Male', 'Female', 'Others'],
    },
    dateOfBirth: { type: Date, required: [true, 'Date of birth is required'] },
    email: { type: String, required: [true, 'Email Address is Required'] },
    contactNo: { type: String, required: [true, 'Contact Number is Required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact Number Required'],
    },
    bloogGroup: { enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    permanentAddress: { type: String },
    presentAddress: { type: String },
    guardian: {
      fatherName: { type: String },
      fatherOccupation: { type: String },
      fatherContactNo: { type: String },
      motherName: { type: String },
      motherOccupation: { type: String },
      motherContactNo: { type: String },
    },
    localGuardian: {
      name: { type: String },
      occupation: { type: String },
      contactNo: { type: String },
      address: { type: String },
    },
    profileImage: { type: String },
    academicDepartment: { type: String },
  },
  {
    timestamps: true,
  },
);

// virtual
facultySchema.virtual('fullName').get(function () {
  return this.name.firstName + this.name.middleName + this.name.lastName;
});

export const FacultyModel = model<TFaculty, IFaculty>('Student', facultySchema);
