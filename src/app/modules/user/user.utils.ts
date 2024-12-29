import TAcademicSemester from '../academicSemester/academicSemester.interface';
import { USER_ROLE } from './user.constant';
import { UserModel } from './user.model';

const lastStudentId = async (): Promise<string | undefined> => {
	try {
		const lastStudent = await UserModel.findOne(
			{ role: 'Student' },
			{ id: 1, _id: 0 },
		)
			.sort({ createdAt: -1 })
			.lean();
		return lastStudent?.id;
	} catch (error) {
		console.error('Error fetching last student ID:', error);
		throw new Error('Failed to fetch last student ID.');
	}
};

export const generateStudentId = async (
	payload: TAcademicSemester,
): Promise<string> => {
	const lastId = await lastStudentId();

	// Extract components of the last ID
	const lastYear = lastId?.substring(0, 4);
	const lastCode = lastId?.substring(4, 6);
	const lastRoll = lastId?.substring(6);

	let resetId = 0;

	// Check if the last ID belongs to the same semester
	if (lastYear === payload.year && lastCode === payload.code) {
		resetId = Number(lastRoll); // Only increment the roll number
	}

	// Generate the new ID
	const newRollNumber = (resetId + 1).toString().padStart(4, '0');
	const generatedId = `${payload.year}${payload.code}${newRollNumber}`;

	return generatedId;
};

// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await UserModel.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await UserModel.findOne(
    {
      role: USER_ROLE.Admin,
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};
