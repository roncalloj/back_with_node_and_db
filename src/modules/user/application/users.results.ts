export class UsersListResultApp {
	readonly id: string;
	readonly name: string;
	readonly lastname: string;
}

export type UserRoleResult = { id: number; roleName: string }[];
export class UserOneResultApp {
	readonly id: string;
	readonly name: string;
	readonly lastname: string;
	readonly email: string;
	readonly roles: UserRoleResult;
}
