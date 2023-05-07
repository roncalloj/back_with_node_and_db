import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../core/base-entity';
import { UsersEntity } from './user.entity';

@Entity({ name: 'role' })
export class RoleEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('varchar', { length: 100 })
	name: string;

	@ManyToMany(() => UsersEntity, (user) => user.roles)
	users: UsersEntity[];
}
