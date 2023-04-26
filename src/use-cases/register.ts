import { prisma } from '@/lib/prisma';
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository';
import { hash } from 'bcryptjs';

interface RegisterUserCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {}
  async execute({ name, email, password }: RegisterUserCaseRequest) {
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (findUser) {
      throw new Error('E-mail already exists.');
    }

    const password_hash = await hash(password, 6);

    // const prismaUsersRepository = new PrismaUsersRepository();

    await this.usersRepository.create({ name, email, password_hash });
  }
}
