export class User {
	private readonly id: string;
	private name: string;
	private lastname: string;
	private email: string;
	private password: string;
	private active: boolean;
	private readonly created_at: Date;
	private updated_at: Date | null;
	private deleted_at: Date | null;

	constructor(
		id: string,
		name: string,
		lastname: string,
		email: string,
		password: string,
		active: boolean,
		created_at: Date,
		updated_at: Date | null,
		deleted_at: Date | null
	) {
		this.id = id;
		this.name = name;
		this.lastname = lastname;
		this.email = email;
		this.password = password;
		this.active = active;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.deleted_at = deleted_at;
	}
}
