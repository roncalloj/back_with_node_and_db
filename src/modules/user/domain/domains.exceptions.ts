export class InvalidEmailException extends Error {
	status: number = 400;

	constructor(message: string) {
		super(InvalidEmailException.getMessage(message));
		this.name = 'InvalidEmailException';
	}

	static getMessage(message: string) {
		return `Invalid email: ${message}`;
	}
}

export class InvalidIDException extends Error {
	status: number = 400;

	constructor(message: string) {
		super(InvalidIDException.getMessage(message));
		this.name = 'InvalidIDException';
	}

	static getMessage(message: string) {
		return `Invalid user ID: ${message}`;
	}
}
