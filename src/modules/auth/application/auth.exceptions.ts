export class AuthUserNotFoundException extends Error {
	status: number = 500;
	constructor(message: string) {
		super(AuthUserNotFoundException.getMessage(message));
		this.name = 'AuthUserNotFoundException';
	}

	static getMessage(message: string) {
		return `User not found: ${message}`;
	}
}

export class AuthUserNotFoundByRefreshTokenException extends Error {
	status: number = 500;
	constructor() {
		super(AuthUserNotFoundByRefreshTokenException.getMessage());
		this.name = 'AuthUserNotFoundByRefreshTokenException';
	}

	static getMessage() {
		return 'User not found';
	}
}

export class AuthInvalidCredentialException extends Error {
	status: number = 500;
	constructor() {
		super(AuthInvalidCredentialException.getMessage());
		this.name = 'UserInsertException';
	}

	static getMessage() {
		return `Invalid credential`;
	}
}
