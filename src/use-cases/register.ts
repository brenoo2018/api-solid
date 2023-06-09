import { prisma } from '@/lib/prisma';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { User } from '@prisma/client';

interface RegisterUserCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    name,
    email,
    password,
  }: RegisterUserCaseRequest): Promise<RegisterUseCaseResponse> {
    const findUser = await this.usersRepository.findByEmail(email);

    if (findUser) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    // const prismaUsersRepository = new PrismaUsersRepository();

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
    return { user };
  }
}
