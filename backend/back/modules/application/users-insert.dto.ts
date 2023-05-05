import { UsersInsertResultApp } from './users-insert.result';

export class UsersInsertDTO {
	static fromResponseToPresentation(
		response: UsersInsertResultApp
	): UsersInsertDTO {
		return {
			id: response.id,
			fullname: `${response.name} ${response.lastname}`,
			email: response.email,
		};
	}
}
