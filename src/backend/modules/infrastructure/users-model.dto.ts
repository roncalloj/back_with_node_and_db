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
}
