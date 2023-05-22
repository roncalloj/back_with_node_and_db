import { UsersInsertResultApp } from '../application/users-insert.result';
import {
	UserOneResultApp,
	UsersListResultApp,
} from '../application/users.results';
import { UsersDomain, UsersProperties } from '../domain/users-domain';
import { RoleEntity } from './entities/role.entity';
import { UsersEntity } from './entities/user.entity';

export class UsersModelDTO {
	static fromDomainToData(user: UsersDomain): UsersEntity {
		const userProperties: UsersProperties = user.properties();
		const userEntity = new UsersEntity();
		userEntity.id = userProperties.id;
		userEntity.name = userProperties.name;
		userEntity.lastname = userProperties.lastname;
		userEntity.email = userProperties.email;
		userEntity.password = userProperties.password;
		userEntity.active = userProperties.active;
		userEntity.roles = userProperties.roles as RoleEntity[];
		userEntity.created_at = userProperties.created_at;
		userEntity.updated_at = userProperties.updated_at;
		userEntity.deleted_at = userProperties.deleted_at;
		return userEntity;
	}

	static fromDataToApplication(userEntity: UsersEntity): UsersInsertResultApp {
		return {
			id: userEntity.id,
			name: userEntity.name,
			lastname: userEntity.lastname,
			email: userEntity.email,
		};
	}

	static fromDataToApplicationList(
		userEntities: UsersEntity[]
	): UsersListResultApp[] {
		return userEntities.map((users) => {
			return {
				id: users.id,
				name: users.name,
				lastname: users.lastname,
			};
		});
	}

	static fromDataToApplicationOne(userEntity: UsersEntity): UserOneResultApp {
		return {
			id: userEntity.id,
			name: userEntity.name,
			lastname: userEntity.lastname,
			email: userEntity.email,
			roles: userEntity.roles.map((role) => ({
				id: role.id,
				roleName: role.name,
			})),
		};
	}
}
