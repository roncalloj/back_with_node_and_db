import {
	UserListResult,
	UsersInsertResult,
} from '../infrastructure/users.infrastructure';
import { UsersDomain } from './users-domain';

export interface UsersRepository {
	insert(user: UsersDomain): Promise<UsersInsertResult>;
	getAll(): Promise<UserListResult>;
}