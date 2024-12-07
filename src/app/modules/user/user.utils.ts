import TAcademicSemester from '../academicSemester/academicSemester.interface';
import { UserModel } from './user.model';

const lastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    { role: 'Student' },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  const lastId = await lastStudentId();
  
  const lastYear = lastId?.substring(0,4)
  const lastCode = lastId?.substring(4,6)
  const lastRoll = lastId?.substring(6)
  
  let resetId = 0;

  if(lastYear == payload.year && lastCode == payload.code){
    resetId = Number(lastId)
  }
  
  const generatedId = `${payload.year}${payload.code}${(resetId + 1).toString().padStart(4, '0')}`;
  return generatedId;
};
