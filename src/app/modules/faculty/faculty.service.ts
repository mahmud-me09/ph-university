import config from '../../config';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import TUser from './faculty.interface';
import { UserModel } from './faculty.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {
    id: '2030100001',
    password: password || (config.defaultPasswordForUser as string),
    role: 'Student',
  };

  const newUser = await UserModel.create(userData);
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

const createFacultyIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};
const createAdminIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

export const UserService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
