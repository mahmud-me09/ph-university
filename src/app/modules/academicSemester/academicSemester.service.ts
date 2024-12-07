import { ObjectId } from 'mongodb';
import { academicSemesterCodeMapper } from './academicSemester.constant';
import TAcademicSemester from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {
  //   As this is a business logic so we write it in the services section.
  if (academicSemesterCodeMapper[payLoad.name] !== payLoad.code) {
    throw new Error('Error Semester name and Code');
  }

  const result = await AcademicSemesterModel.create(payLoad);
  return result;
};

const getAllAcademicSemesterIntoDB = async () => {
  const result = await AcademicSemesterModel.find();
  return result;
};

const getAAcademicSemesterIntoDB = async (payload: string) => {
  const result = await AcademicSemesterModel.findOne({
    _id: new ObjectId(payload),
  });
  return result;
};

const updateAcademicSemesterIntoDB = async (
  payLoad: TAcademicSemester,
  params: string,
) => {
  //   As this is a business logic so we write it in the services section.
  if (academicSemesterCodeMapper[payLoad.name] !== payLoad.code) {
    throw new Error('Error Semester name and Code');
  }

  await AcademicSemesterModel.updateOne(
    { _id: new ObjectId(params) },
    { $set: payLoad },
    { runValidators: true },
  );
  const result = await AcademicSemesterModel.findOne({
    _id: new ObjectId(params),
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterIntoDB,
  getAAcademicSemesterIntoDB,
  updateAcademicSemesterIntoDB,
};
