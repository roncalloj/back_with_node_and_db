import { v4 as uuidv4 } from 'uuid';

export class TokenService {
	static generateRefreshTOken(): string {
		return uuidv4();
	}
}
