import { UsersDomain } from '../domain/users-domain';
import { UsersEntity } from './entities/users';

export class UsersGetAllDTO {
	static fromDataToDomain(data: UsersEntity[]): UsersDomain[] {
		return data.map((user) => {
			return new UsersDomain(user.fullname, user.email, user.password);
		});
	}
}
