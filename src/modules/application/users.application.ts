import { Result, err, ok } from 'neverthrow';
import { RoleRepository } from '../domain/role.repository';
import { UsersDomain } from '../domain/users-domain';
import { UsersRepository } from '../domain/users.repository';
import { PasswordCipherService } from './psswd_cipher.service';
import { UsersInsertDTO } from './users-insert.dto';
import { UserOneResultApp, UsersListResultApp } from './users.results';

export type UsersInsertResultApplication = Result<UsersInsertDTO, any>;
export type UsersListResultApplication = Result<UsersListResultApp[], any>;
export type UserOneResultApplication = Result<UserOneResultApp, any>;

export class UsersApplication {
	constructor(
		private readonly repositoryUser: UsersRepository,
		private readonly repositoryRole: RoleRepository
	) {}

	async getAll(): Promise<UsersListResultApplication> {
		const listResult = await this.repositoryUser.getAll();

		if (listResult.isErr()) {
			return err(listResult.error);
		}
		return ok(listResult.value);
	}
	async getOne(id: string): Promise<UserOneResultApplication> {
		const oneResult = await this.repositoryUser.getOne(id);
		if (oneResult.isErr()) {
			return err(oneResult.error);
		}
		return ok(oneResult.value);
	}
	async insert(user: UsersDomain): Promise<UsersInsertResultApplication> {
		user.password = await PasswordCipherService.encrypt(user.password);
		const rolesInstanceResult = await this.repositoryRole.getInstanceByID(
			user.roles as number[]
		);
		if (rolesInstanceResult.isErr()) {
			return err(rolesInstanceResult.error);
		}
		user.roles = rolesInstanceResult.value;

		const userResult = await this.repositoryUser.insert(user);
		if (userResult.isErr()) {
			return err(userResult.error);
		}
		return ok(UsersInsertDTO.fromResponseToPresentation(userResult.value));
	}
}
