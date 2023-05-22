import { Column } from 'typeorm';

export class BaseEntity {
	@Column('datetime', { nullable: false })
	created_at: Date;

	@Column('datetime', { nullable: true })
	updated_at: Date;

	@Column('datetime', { nullable: true })
	deleted_at: Date;
}
