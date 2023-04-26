import DataBaseBootstrap from 'src/server_and_db/db.bootstrap';
import { UsersDomain } from '../domain/users-domain';
import { UsersRepository } from '../domain/users.repository';
import { UsersEntity } from './entities/user.entity';
import { UsersGetAllDTO } from './users-getAll.dto';
import { UsersModelDTO } from './users-model.dto';

export class UsersInfrastructure implements UsersRepository {
	async insert(user: UsersDomain) {
		const repository = DataBaseBootstrap.dataSource.getRepository(UsersEntity);
		const userEntity = UsersModelDTO.fromDomainToData(user);
		await repository.save(userEntity);
	}
	getAll(): any {}
}
