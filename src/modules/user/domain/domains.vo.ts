import { Result, err, ok } from 'neverthrow';
import { validate as uuidValidate } from 'uuid';
import {
	InvalidEmailException,
	InvalidIDException,
} from './domains.exceptions';

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

export type IDResult = Result<IDVO, InvalidIDException>;
export class IDVO {
	private value: string;

	private constructor(value: string) {
		this.value = value;
	}

	static create(value: string): IDResult {
		if (!uuidValidate(value)) {
			return err(new InvalidIDException(value));
		}
		return ok(new IDVO(value));
	}

	getValue(): string {
		return this.value;
	}
}
