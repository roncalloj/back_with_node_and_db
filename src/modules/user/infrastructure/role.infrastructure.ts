import { Result, err, ok } from 'neverthrow';
import { In } from 'typeorm';
import DataBaseBootstrap from '../../server_and_db/db/db.bootstrap';
import { RoleRepository } from '../user/domain/role.repository';
import { RoleEntity } from './entities/role.entity';
import { RoleListException } from './role.exceptions';

export type RoleListResult = Result<RoleEntity[], RoleListException>;

export class RoleInfrastructure implements RoleRepository {
	async getInstanceByID(ids: number[]): Promise<RoleListResult> {
		try {
			const repository = DataBaseBootstrap.dataSource.getRepository(RoleEntity);
			return ok(await repository.findBy({ id: In(ids) }));
		} catch (error) {
			return err(new RoleListException(error.message));
		}
	}
}
