import { Result, err, ok } from 'neverthrow';
import { InvalidEmailException } from './domains.exceptions';

export type EmailResult = Result<EmailVO, InvalidEmailException>;

export class EmailVO {
	private value: string;
	static readonly patternEmail =
		/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

	private constructor(email: string) {
		this.value = email;
	}

	static create(email: string): EmailResult {
		if (!this.patternEmail.test(email)) {
			return err(new InvalidEmailException(email));
		}
		return ok(new EmailVO(email));
	}

	getValue(): string {
		return this.value;
	}
}
