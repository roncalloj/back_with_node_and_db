// import { err } from 'neverthrow';
// import { UsersRepository } from 'src/modules/user/domain/users.repository';
// import { AuthRepository } from '../domain/auth.repository';
// import { AuthUserNotFoundException } from './auth.exceptions';

// export class AuthInfrastructure implements AuthRepository {
// 	constructor(private readonly userRepository: UsersRepository) {}

// 	async login(email: string, password: string): Promise<AuthLoginResult> {
// 		const userFoundResult = await this.userRepository.getOneWithPsswd(email);
// 		if (userFoundResult.isErr()) {
// 			return err(new AuthUserNotFoundException(userFoundResult.error.message));
// 		}
// 		const userFound = userFoundResult.value;
// 	}
// }
