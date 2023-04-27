import { Prisma, Gym } from '@prisma/client';
import { GymsRepository } from '../gyms-repository';
import { Decimal } from '@prisma/client/runtime';

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  // async create(data: Prisma.GymCreateInput) {
  //   const gym = {
  //     id: 'gym-01',
  //     title: 'js',
  //     description: '',
  //     phone: '',
  //     latitude: new Decimal(0),
  //     longitude: new Decimal(0),
  //   };

  //   this.items.push(gym);

  //   return gym;
  // }
  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
