import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/registration.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { OfferedCourseRoute } from '../modules/offeredCourse/offeredCourse.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { AdminRoutes } from '../modules/admin/admin.route';

const router = Router();

const moduleRoutes: { path: string; route: Router }[] = [
	{
		path: '/users',
		route: UserRoutes,
	},
	{
		path: '/students',
		route: StudentRoutes,
	},
	{
		path: '/admin',
		route: AdminRoutes,
	},
	{
		path: '/academic-semester',
		route: AcademicSemesterRoutes,
	},
	{
		path: '/academic-faculty',
		route: AcademicFacultyRoute,
	},
	{
		path: '/academic-department',
		route: AcademicDepartmentRoute,
	},
	{
		path: '/course',
		route: CourseRoutes,
	},
	{
		path: '/semester-registration',
		route: SemesterRegistrationRoutes,
	},
	{
		path: '/offered-course',
		route: OfferedCourseRoute,
	},
	{
		path: '/auth',
		route: AuthRoutes,
	},
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
