import { UsersDomain } from './users-domain';

export interface UsersRepository {
	insert(user: UsersDomain): void;
	getAll(): UsersDomain[];
}
