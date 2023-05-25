import { UsersRepository } from 'src/modules/user/domain/users.repository';

export class AuthApplication {
	constructor(private userRepository: UsersRepository) {}

	login(email: string, password: string) {}
}
