export class UserInsertException extends Error {
	status: number = 500;
	constructor(message: string) {
		super(UserInsertException.getMessage(message));
		this.name = 'UserInsertException';
	}

	static getMessage(message: string) {
		return `An error occurred while registering the user: ${message}`;
	}
}

export class UserListException extends Error {
	starus: number = 500;
	constructor(message: string) {
		super(UserListException.getMessage(message));
		this.name = 'UserListException';
	}

	static getMessage(message: string) {
		return `An error occurred while listing the users: ${message}`;
	}
}
