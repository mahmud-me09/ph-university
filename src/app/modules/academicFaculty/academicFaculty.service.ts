import TAcademicFaculty from './academicFaculty.interface';
import { AcademicFacultyModel } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = AcademicFacultyModel.create(payload);
  return result;
};

const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFacultyModel.find();
  return result;
};

const getAAcademicFacultyFromDB = async (id: string) => {
    const result = await AcademicFacultyModel.findById(id)
    return result
};

const updateAcademicFacultyIntoDB = async (id: string, payload:Partial<TAcademicFaculty>) => {
    const result = await AcademicFacultyModel.findOneAndUpdate({_id:id}, payload,{
        new:true
    })
    return result
}

export const AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultyFromDB,
    getAAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
}
