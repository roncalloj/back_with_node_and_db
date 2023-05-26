import { addDays, addMinutes } from 'date-fns';
import * as jwt from 'jwt-simple';
import yenv from 'yenv';
import { AuthApplicationDTO } from './auth.dto';

const env = yenv();
export class AuthService {
	static generateAccessToken(authDTO: AuthApplicationDTO): string {
		const createdAccTokenDate = new Date();
		const expireAccTokenDate = addMinutes(
			createdAccTokenDate,
			env.JWT_EXPIRE_ACCESS_TOKEN
		);
		const payload = {
			name: authDTO.name,
			lastname: authDTO.lastname,
			roles: authDTO.roles,
			iat: createdAccTokenDate.getTime(),
			exp: expireAccTokenDate.getTime(),
		};
		return jwt.encode(payload, env.JWT_KEY);
	}
}
