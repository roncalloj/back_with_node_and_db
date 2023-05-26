import { NextFunction, Request, Response } from 'express';
import { TokenService } from './token.service';

export class AuthenticationMiddleWare {
	constructor() {}
	async authenticate(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		if (request.headers.authorization) {
			const headerAuth = request.headers.authorization;
			if (
				headerAuth?.split(' ').length === 2 &&
				headerAuth.split(' ')[0] === 'Bearer'
			) {
				const token = request.headers.authorization?.split(' ')[1];
				const tokenStatus = TokenService.tokenValidation(token);
				if (tokenStatus.status === 200) {
					next();
				} else {
					response
						.status(tokenStatus.status)
						.json({ error: tokenStatus.message });
				}
			} else {
				response.status(401).json({ error: 'Unauthorized' });
			}
		} else {
			response.status(401).json({ error: 'Unauthorized' });
		}
	}
}
