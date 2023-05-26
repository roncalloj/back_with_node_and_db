import { Request, Response } from 'express';
import { UsersRepository } from '../../user/domain/users.repository';
import { UsersInfrastructure } from '../../user/infrastructure/users.infrastructure';
import { AuthApplication } from '../application/auth.application';

const userInfraestructure: UsersRepository = new UsersInfrastructure();
const authApplication = new AuthApplication(userInfraestructure);

class AuthController {
	constructor() {
		// this.login = this.login.bind(this);
	}
	async login(request: Request, response: Response) {
		const { email, password } = request.body;
		const loginResult = await authApplication.login(email, password);

		if (loginResult.isErr()) {
			return response.status(loginResult.error.status).json({
				name: loginResult.error.name,
				message: loginResult.error.message,
			});
		}
		response.json(loginResult.value);
	}
}

export default AuthController;
