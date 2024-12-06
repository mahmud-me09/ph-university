import { Model, Types } from 'mongoose';

export interface TFaculty {
  id: string;
  user: Types.ObjectId;
  name: { firstName: string; middleName?: string; lastName: string };
  gender: 'Male' | 'Female' | 'Others';
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  permanentAddress: string;
  presentAddress: string;
  guardian: {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
  };
  localGuardian: {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
  };
  profileImage: string;
  academicDepartment: string;
}

export interface IFaculty extends Model<TFaculty> {
  isUserExists(id: string): Promise<TFaculty | null>;
}