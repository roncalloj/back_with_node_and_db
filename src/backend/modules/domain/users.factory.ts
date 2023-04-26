import { v4 as uuidv4 } from 'uuid';
import { UsersDomain, UsersProperties } from './users-domain';

export class UsersFactory {
	static readonly patternEmail =
		/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

	static create(
		name: string,
		lastname: string,
		email: string,
		password: string
	): UsersDomain {
		if (name.length < 3) {
			throw new Error('Name must be at least 3 characters');
		}
		if (password.length < 6) {
			throw new Error('Password must be at least 6 characters');
		}
		if (!this.patternEmail.test(email)) {
			throw new Error('Email is not valid');
		}

		const properties: UsersProperties = {
			id: uuidv4(),
			name,
			lastname,
			email,
			password,
			roles: [],
		};

		return new UsersDomain(properties);
	}
}
