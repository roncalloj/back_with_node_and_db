import { Result, err, ok } from 'neverthrow';

import DataBaseBootstrap from '../../../server_and_db/db.bootstrap';
import { UsersDomain } from '../domain/users-domain';
import { UsersRepository } from '../domain/users.repository';
import { UsersEntity } from './entities/user.entity';
import { UsersModelDTO } from './users-model.dto';
import { UserInsertException } from './users.exceptions';
import { UsersInsertResultApp } from '../application/users-insert.result';

export type UsersInsertResult = Result<
	UsersInsertResultApp,
	UserInsertException
>;

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
	getAll(): any {}
}
