export interface UserEssentials {
	readonly id: string;
	readonly name: string;
	readonly lastname: string;
	readonly email: string;
	readonly password: string;
	readonly roles: number[] | unknown[];
}

export interface UserOptionals {
	readonly active: boolean;
	readonly created_at: Date;
	readonly updated_at: Date | null;
	readonly deleted_at: Date | null;
}

export type UsersProperties = Required<UserEssentials> & Partial<UserOptionals>;

export type UserUpdateProperties = {
	readonly name: string;
	readonly lastname: string;
	password: string;
	roles: number[] | unknown[];
};

export class UsersDomain {
	readonly id: string;
	name: string;
	lastname: string;
	email: string;
	password: string;
	roles: number[] | unknown[];
	active: boolean;
	readonly created_at: Date;
	updated_at: Date | null;
	deleted_at: Date | null;

	constructor(properties: UsersProperties) {
		this.active = true;
		this.created_at = new Date();
		Object.assign(this, properties);
	}

	properties(): UsersProperties {
		return {
			id: this.id,
			name: this.name,
			lastname: this.lastname,
			email: this.email,
			password: this.password,
			roles: this.roles,
			active: this.active,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
		};
	}

	update(properties: Partial<UserUpdateProperties>): void {
		Object.assign(this, properties);
		this.updated_at = new Date();
	}

	delete(): void {
		this.active = false;
		this.deleted_at = new Date();
	}
}
