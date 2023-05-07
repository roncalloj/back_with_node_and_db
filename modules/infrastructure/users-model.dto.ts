import { UsersInsertResultApp } from '../application/users-insert.result';
import { UsersListResultApp } from '../application/users-list.result';
import { UsersDomain, UsersProperties } from '../domain/users-domain';
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
}
