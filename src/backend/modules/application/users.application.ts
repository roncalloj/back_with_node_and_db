import { UsersDomain } from "../domain/users-domain";
import { UsersRepository } from "../domain/users.repository";

export class UsersApplication {
   private repository: UsersRepository;
   constructor(repository: UsersRepository) {
      this.repository = repository;
   }
   getAll(): UsersDomain[]{
      return this.repository.getAll();
   }
   insert(user: UsersDomain): void {
      return this.repository.insert(user);
   }
}