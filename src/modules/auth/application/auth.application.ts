import { err, ok, Result } from 'neverthrow';
import { v4 as uuidv4 } from 'uuid';
import { PasswordCipherService } from '../../user/application/psswd_cipher.service';
import { UsersRepository } from '../../user/domain/users.repository';
import { AuthTokens } from './auth-tokens.dto';
import {
	AuthInvalidCredentialException,
	AuthUserNotFoundByRefreshTokenException,
	AuthUserNotFoundException,
} from './auth.exceptions';
import { AuthService } from './auth.service';

export type AuthLoginResult = Result<AuthTokens, AuthUserNotFoundException | AuthInvalidCredentialException>;
export type AuthGetNewAccToken = Result<AuthTokens, AuthUserNotFoundByRefreshTokenException>;

export class AuthApplication {
	constructor(private readonly userRepository: UsersRepository) {}

	async login(email: string, password: string): Promise<AuthLoginResult> {
		const userResult = await this.userRepository.getUserByEmail(email);
		if (userResult.isErr()) {
			return err(new AuthUserNotFoundException(userResult.error.message));
		}
		const passwordCipher = userResult.value.password;
		const refreshToken = userResult.value.refreshToken;

		const passwordMatch = PasswordCipherService.passwordValidation(password, passwordCipher);
		if (!passwordMatch) {
			return err(new AuthInvalidCredentialException());
		}

		const accessToken = AuthService.generateAccessToken(userResult.value);
		return ok(new AuthTokens(accessToken, refreshToken));
	}

	async getNewAccToken(refreshToken: string): Promise<AuthGetNewAccToken> {
		const userResult = await this.userRepository.getUserByRefreshToken(refreshToken);
		if (userResult.isErr()) {
			return err(new AuthUserNotFoundByRefreshTokenException());
		}
		const user = await this.userRepository.getOneWithPsswd(userResult.value.id);
		if (user.isErr()) {
			return err(user.error);
		}
		const foundUser = user.value;
		const newRefreshToken = uuidv4();
		foundUser.update({ refreshToken: newRefreshToken });

		const updateResult = await this.userRepository.update(foundUser);
		if (updateResult.isErr()) {
			return err(updateResult.error);
		}
		userResult.value.refreshToken = newRefreshToken;

		const accessToken = AuthService.generateAccessToken(userResult.value);
		return ok(new AuthTokens(accessToken, newRefreshToken));
	}
}
