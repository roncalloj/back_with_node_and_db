import { Result, err, ok } from 'neverthrow';

import DataBaseBootstrap from '../../server_and_db/db/db.bootstrap';
import { UsersInsertResultApp } from '../application/users-insert.result';
import { UsersListResultApp } from '../application/users-list.result';
import { UsersDomain } from '../domain/users-domain';
import { UsersRepository } from '../domain/users.repository';
import { UsersEntity } from './entities/user.entity';
import { UsersModelDTO } from './users-model.dto';
import { UserInsertException, UserListException } from './users.exceptions';

export type UsersInsertResult = Result<
	UsersInsertResultApp,
	UserInsertException
>;

export type UserListResult = Result<UsersListResultApp[], UserListException>;

export class UsersInfrastructure implements UsersRepository {
	async insert(user: UsersDomain): Promise<UsersInsertResult> {
		try {
			const repository =
				DataBaseBootstrap.dataSource.getRepository(UsersEntity);
			const userEntity = UsersModelDTO.fromDomainToData(user);
			const userInserted = await repository.save(userEntity);
			return ok(UsersModelDTO.fromDataToApplication(userInserted));
		} catch (error) {
			return err(new UserInsertException(error.message));
		}
	}
	async getAll(): Promise<UserListResult> {
		try {
			const repository =
				DataBaseBootstrap.dataSource.getRepository(UsersEntity);
			const users: UsersEntity[] = await repository.find({
				where: { active: true },
			});
			return ok(UsersModelDTO.fromDataToApplicationList(users));
		} catch (error) {
			return err(new UserListException(error.message));
		}
	}
}
