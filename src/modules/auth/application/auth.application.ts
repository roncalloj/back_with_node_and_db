import { err } from 'neverthrow';
import { PasswordCipherService } from '../../user/application/psswd_cipher.service';
import { UsersRepository } from '../../user/domain/users.repository';
import {
	AuthInvalidCredentialException,
	AuthUserNotFoundException,
} from './auth.exceptions';
import { AuthService } from './auth.service';

export class AuthApplication {
	constructor(private readonly userRepository: UsersRepository) {}

	async login(email: string, password: string) {
		const userResult = await this.userRepository.getUserByEmail(email);
		if (userResult.isErr()) {
			return err(new AuthUserNotFoundException(userResult.error.message));
		}
		const passwordCipher = userResult.value.password;

		const passwordMatch = PasswordCipherService.passwordValidation(
			password,
			passwordCipher
		);
		if (!passwordMatch) {
			return err(new AuthInvalidCredentialException());
		}

		const accessToken = AuthService.generateAccessToken(userResult.value);
	}
}
