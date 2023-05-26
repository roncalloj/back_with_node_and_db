import * as jwt from 'jwt-simple';
import yenv from 'yenv';
import { TOKEN_STATUS, TokenStatus } from './token-status.enum';

const env = yenv();

export class TokenService {
	static tokenValidation(token: string): TOKEN_STATUS {
		try {
			const payload = jwt.decode(token, env.JWT_KEY);
			console.log(payload.exp, Date.now());
			if (Date.now() / 1000 > payload.exp) {
				return { status: 403, message: TokenStatus.TOKEN_EXPIRED };
			}
			return { status: 200, message: TokenStatus.TOKEN_VALID };
		} catch (error) {
			return { status: 401, message: TokenStatus.TOKEN_INVALID };
		}
	}
}
