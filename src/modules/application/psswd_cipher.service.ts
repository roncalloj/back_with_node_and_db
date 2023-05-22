import * as bcrypt from 'bcryptjs';

export class PasswordCipherService {
	static encrypt(text: string): Promise<string> {
		return bcrypt.hash(text, 10);
	}

	static passwordValidation(
		text: string,
		hashedText: string
	): Promise<boolean> {
		return bcrypt.compare(text, hashedText);
	}
}
