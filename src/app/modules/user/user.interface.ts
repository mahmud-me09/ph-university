import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
	id: string;
	password: string;
	needsPasswordReset: boolean;
	role: 'Student' | 'Teacher' | 'Admin';
	isDeleted: boolean;
	status: 'blocked' | 'in-progress';
}

export interface IUser extends Model<TUser> {
	isUserExistsByCustomId(id: string): Promise<TUser>;
	isPasswordMatched(
		plainTextPassword: string,
		hashedPassword: string,
	): Promise<boolean>;
}

export type TUserRoles = keyof typeof USER_ROLE;
