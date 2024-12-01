import { Date, ObjectId, Types } from 'mongoose';

interface TUser {
  _id: Types.ObjectId;
  id: string;
  password: string;
  needsPasswordReset: boolean;
  role: "Student" | "Teacher" | "Admin";
  isDeleted: boolean;
  status:"blocked" | "in-progress";
}

export default TUser;
