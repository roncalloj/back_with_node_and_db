export type AuthRoles = { id: number; roleName: string };

export class AuthApplicationDTO {
	id: string;
	name: string;
	lastname: string;
	roles: AuthRoles[];
	password: string;
	refreshToken: string;
}
