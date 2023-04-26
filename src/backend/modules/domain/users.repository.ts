import { UsersDomain } from './users-domain';

export interface UsersRepository {
	insert(user: UsersDomain): Promise<void>;
	getAll(): UsersDomain[];
}
