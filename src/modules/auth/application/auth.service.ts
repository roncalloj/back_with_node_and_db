import * as jwt from 'jwt-simple';
import yenv from 'yenv';
import { AuthApplicationDTO } from './auth.dto';

const env = yenv();
export class AuthService {
	static generateAccessToken(authDTO: AuthApplicationDTO): string {
		const payload = {
			name: authDTO.name,
			lastname: authDTO.lastname,
			roles: authDTO.roles,
		};
		return jwt.encode(payload, env.JWT_KEY);
	}
}
