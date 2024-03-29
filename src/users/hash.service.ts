import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hashSync(password, saltOrRounds);
  }

  async comparePassword(password: string, hash) {
    return await bcrypt.compare(password, hash);
  }
}
