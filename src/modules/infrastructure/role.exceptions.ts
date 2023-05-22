export class RoleListException extends Error {
	starus: number = 500;
	constructor(message: string) {
		super(RoleListException.getMessage(message));
		this.name = 'RoleListException';
	}

	static getMessage(message: string) {
		return `An error occurred while listing roles: ${message}`;
	}
}
