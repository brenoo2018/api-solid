import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

interface RegisterUserCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUserCaseRequest) {
  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (findUser) {
    throw new Error('E-mail already exists.');
  }

  const password_hash = await hash(password, 6);

  await prisma.user.create({
    data: { name, email, password_hash },
  });
}
