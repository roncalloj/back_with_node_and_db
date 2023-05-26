export class AuthUserNotFoundException extends Error {
	status: number = 500;
	constructor(message: string) {
		super(AuthUserNotFoundException.getMessage(message));
		this.name = 'UserInsertException';
	}

	static getMessage(message: string) {
		return `User not found: ${message}`;
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
