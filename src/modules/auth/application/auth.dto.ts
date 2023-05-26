export type AuthRoles = { id: number; roleName: string };

export class AuthApplicationDTO {
	name: string;
	lastname: string;
	roles: AuthRoles[];
	password: string;
}
