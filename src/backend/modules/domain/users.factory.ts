import { Result, err, ok } from 'neverthrow';
import { v4 as uuidv4 } from 'uuid';
import { InvalidEmailException } from './domains.exceptions';
import { EmailVO } from './domains.vo';
import { UsersDomain, UsersProperties } from './users-domain';

export type UsersResult = Result<UsersDomain, InvalidEmailException | Error>;

export class UsersFactory {
	static create(
		name: string,
		lastname: string,
		email: string,
		password: string
	): UsersResult {
		if (name.length < 3) {
			return err(new Error('Name must be at least 3 characters'));
		}
		if (password.length < 6) {
			return err(new Error('Password must be at least 6 characters'));
		}
		if (email.trim().length === 0) {
			return err(new Error('Email is required'));
		}
		const emailResult = EmailVO.create(email);

		if (emailResult.isErr()) {
			return err(emailResult.error);
		}

		const properties: UsersProperties = {
			id: uuidv4(),
			name,
			lastname,
			email: emailResult.value.getValue(),
			password,
			roles: [],
		};

		return ok(new UsersDomain(properties));
	}
}
