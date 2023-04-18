import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../../core/base-entity';

@Entity({ name: 'user' })
export class UsersEntity extends BaseEntity {
	@PrimaryColumn()
	id: string;

	@Column('varchar', { length: 100 })
	name: string;

	@Column('varchar', { length: 100 })
	lastname: string;

	@Column('varchar', { length: 100 })
	email: string;

	@Column('varchar', { length: 150 })
	password: string;

	@Column('boolean', { default: true })
	active: boolean;
}
