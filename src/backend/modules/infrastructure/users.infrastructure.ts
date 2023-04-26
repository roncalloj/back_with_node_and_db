import DataBaseBootstrap from 'src/server_and_db/db.bootstrap';
import { UsersDomain } from '../domain/users-domain';
import { UsersRepository } from '../domain/users.repository';
import { UsersEntity } from './entities/user.entity';
import { UsersGetAllDTO } from './users-getAll.dto';

export class UsersInfrastructure implements UsersRepository {
	insert(user: UsersDomain): void {
		const repository = DataBaseBootstrap.dataSource.getRepository(UsersEntity);
	}
	getAll(): UsersDomain[] {
		const results = [
			new UsersEntity('Jhon Smith', 'john@email.com', '123456'),
			new UsersEntity('Sam Smith', 'sam@email.com', '123456'),
			new UsersEntity('Mary Smith', 'mary@email.com', '123456'),
		];
		return UsersGetAllDTO.fromDataToDomain(results);
	}
}
