import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { HashService } from 'src/users/hash.service';
import { UserDocument } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);
    if (user && (await this.hashService.comparePassword(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: UserDocument) {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findUserByToken(token: string) {
    const decoded = await this.jwtService.verifyAsync(token);
    const userId = decoded.id;

    const user = this.userService.getUserById(userId);
    console.log('user', user);

    return user;
  }
}
