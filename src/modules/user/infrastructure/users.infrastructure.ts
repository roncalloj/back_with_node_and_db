import { Result, err, ok } from 'neverthrow';

import { AuthApplicationDTO } from 'src/modules/auth/application/auth.dto';
import DataBaseBootstrap from '../../../server_and_db/db/db.bootstrap';
import { UsersInsertResultApp } from '../application/users-insert.result';
import { UserOneResultApp, UsersListResultApp } from '../application/users.results';
import { UsersDomain } from '../domain/users-domain';
import { UsersRepository } from '../domain/users.repository';
import { UsersEntity } from './entities/user.entity';
import { UsersModelDTO } from './users-model.dto';
import {
	UserInsertException,
	UserListException,
	UserNotFoundByRefreshTokenException,
	UserNotFoundException,
	UserOneException,
	UserUpdateException,
} from './users.exceptions';

export type UsersInsertResult = Result<UsersInsertResultApp, UserInsertException>;
export type UserListResult = Result<UsersListResultApp[], UserListException>;
export type UserOneResult = Result<UserOneResultApp, UserOneException | UserNotFoundException>;
export type UserWithPsswdResult = Result<UsersDomain, UserOneException | UserNotFoundException>;

export type UserByEmailResult = Result<AuthApplicationDTO, UserOneException | UserNotFoundException>;

export type UserByRefreshTokenResult = Result<
	AuthApplicationDTO,
	UserOneException | UserNotFoundByRefreshTokenException
>;

export class UsersInfrastructure implements UsersRepository {
	async insert(user: UsersDomain): Promise<UsersInsertResult> {
		try {
			const repository = DataBaseBootstrap.dataSource.getRepository(UsersEntity);
			const userEntity = UsersModelDTO.fromDomainToData(user);
			const userInserted = await repository.save(userEntity);
			return ok(UsersModelDTO.fromDataToApplication(userInserted));
		} catch (error) {
			return err(new UserInsertException(error.message));
		}
	}

	async getAll(): Promise<UserListResult> {
		try {
			const repository = DataBaseBootstrap.dataSource.getRepository(UsersEntity);
			const users: UsersEntity[] = await repository.find({
				where: { active: true },
			});
			return ok(UsersModelDTO.fromDataToApplicationList(users));
		} catch (error) {
			return err(new UserListException(error.message));
		}
	}

	async getOne(id: string): Promise<UserOneResult> {
		try {
			const repository = DataBaseBootstrap.dataSource.getRepository(UsersEntity);
			const users: UsersEntity = await repository.findOne({
				where: { active: true, id },
			});

			if (!users) {
				return err(new UserNotFoundException(id));
			}
			return ok(UsersModelDTO.fromDataToApplicationOne(users));
		} catch (error) {
			return err(new UserOneException(error.message));
		}
	}

	async getOneWithPsswd(id: string): Promise<UserWithPsswdResult> {
		try {
			const repository = DataBaseBootstrap.dataSource.getRepository(UsersEntity);
			const users: UsersEntity = await repository.findOne({
				where: { active: true, id },
			});
			if (!users) {
				return err(new UserNotFoundException(id));
			}
			return ok(UsersModelDTO.fromDataToDomain(users));
		} catch (error) {
			return err(new UserOneException(error.message));
		}
	}

	async update(user: UsersDomain): Promise<UsersInsertResult> {
		try {
			const repository = DataBaseBootstrap.dataSource.getRepository(UsersEntity);
			const userEntity = UsersModelDTO.fromDomainToData(user);
			const userUpdate = await repository.save(userEntity);
			return ok(UsersModelDTO.fromDataToApplication(userUpdate));
		} catch (error) {
			return err(new UserUpdateException(error.message));
		}
	}

	async getUserByEmail(email: string): Promise<UserByEmailResult> {
		try {
			const repository = DataBaseBootstrap.dataSource.getRepository(UsersEntity);
			const users: UsersEntity = await repository.findOne({
				where: { active: true, email },
			});
			if (!users) {
				return err(new UserNotFoundException(email));
			}
			return ok(UsersModelDTO.fromDataToAuth(users));
		} catch (error) {
			return err(new UserOneException(error.message));
		}
	}

	async getUserByRefreshToken(refreshToken: string): Promise<UserByRefreshTokenResult> {
		try {
			const repository = DataBaseBootstrap.dataSource.getRepository(UsersEntity);
			const users: UsersEntity = await repository.findOne({
				where: { active: true, refreshToken },
			});
			if (!users) {
				return err(new UserNotFoundByRefreshTokenException());
			}
			return ok(UsersModelDTO.fromDataToAuth(users));
		} catch (error) {
			return err(new UserOneException(error.message));
		}
	}
}
