import { Injectable } from '@nestjs/common';
import { userType } from './user.interface';

const users = [
  {
    userId: 1,
    username: 'john',
    password: 'changeme',
  },
  {
    userId: 2,
    username: 'maria',
    password: 'guess',
  },
  {
    userId: 3,
    username: 'victor',
    password: '123456',
  }
];

@Injectable()
export class UserService {
  async findUserByUsername(username: string) : Promise<userType | null> {
    return users.find((user) => user.username === username) || null;
  }

  async getAll(): Promise<userType[]> {
    return users;
  }
}
