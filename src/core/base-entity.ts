import { Column } from 'typeorm';

export class BaseEntity {
	@Column('date', { nullable: false })
	created_at: Date;

	@Column('date', { nullable: true })
	updated_at: Date;

	@Column('date', { nullable: true })
	deleted_at: Date;
}
