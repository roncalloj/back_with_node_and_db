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
