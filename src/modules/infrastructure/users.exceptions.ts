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
	status: number = 500;
	constructor(message: string) {
		super(UserListException.getMessage(message));
		this.name = 'UserListException';
	}

	static getMessage(message: string) {
		return `An error occurred while listing the users: ${message}`;
	}
}

export class UserOneException extends Error {
	status: number = 500;
	constructor(message: string) {
		super(UserOneException.getMessage(message));
		this.name = 'UserOneException';
	}

	static getMessage(message: string) {
		return `An error occurred while getting the user: ${message}`;
	}
}

export class UserNotFoundException extends Error {
	status: number = 404;
	constructor(message: string) {
		super(UserNotFoundException.getMessage(message));
		this.name = 'UserNotFoundException';
	}

	static getMessage(message: string) {
		return `User ID ${message} not found`;
	}
}

export class UserUpdateException extends Error {
	status: number = 500;
	constructor(message: string) {
		super(UserUpdateException.getMessage(message));
		this.name = 'UserUpdateException';
	}

	static getMessage(message: string) {
		return `An error occurred while updating the user: ${message}`;
	}
}
