import { RoleListResult } from '../../infrastructure/role.infrastructure';

export interface RoleRepository {
	getInstanceByID(ids: number[]): Promise<RoleListResult>;
}
