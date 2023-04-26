export interface UserEssentials {
	readonly id: string;
	readonly name: string;
	readonly lastname: string;
	readonly email: string;
	readonly password: string;
}

export interface UserOptionals {
	readonly active: boolean;
	readonly created_at: Date;
	readonly updated_at: Date | null;
	readonly deleted_at: Date | null;
}

export type UsersProperties = Required<UserEssentials> & Partial<UserOptionals>;

export class UsersDomain {
	private readonly id: string;
	private name: string;
	private lastname: string;
	private email: string;
	private password: string;
	private active: boolean;
	private readonly created_at: Date;
	private updated_at: Date | null;
	private deleted_at: Date | null;

	constructor(properties: UsersProperties) {
		this.active = true;
		Object.assign(this, properties);
	}

	properties(): UsersProperties {
		return {
			id: this.id,
			name: this.name,
			lastname: this.lastname,
			email: this.email,
			password: this.password,
			active: this.active,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
		};
	}

	update(properties: Partial<UsersProperties>): void {
		Object.assign(this, properties);
		this.updated_at = new Date();
	}

	delete(): void {
		this.active = false;
		this.deleted_at = new Date();
	}
}
