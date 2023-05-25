import {
	UserByEmailResult,
	UserListResult,
	UserOneResult,
	UserWithPsswdResult,
	UsersInsertResult,
} from '../infrastructure/users.infrastructure';
import { UsersDomain } from './users-domain';

export interface UsersRepository {
	insert(user: UsersDomain): Promise<UsersInsertResult>;
	getAll(): Promise<UserListResult>;
	getOne(id: string): Promise<UserOneResult>;
	getOneWithPsswd(id: string): Promise<UserWithPsswdResult>;
	update(user: UsersDomain): Promise<UsersInsertResult>;
	getUserByEmail(email: string): Promise<UserByEmailResult>;
}
