import { Result } from 'neverthrow';
import { UsersEntity } from '../infrastructure/entities/user.entity';
import { UsersDomain } from './users-domain';
import { UserInsertException } from '../infrastructure/users.exceptions';
import { UsersInsertResult } from '../infrastructure/users.infrastructure';

export interface UsersRepository {
	insert(user: UsersDomain): Promise<UsersInsertResult>;
	getAll(): UsersDomain[];
}
