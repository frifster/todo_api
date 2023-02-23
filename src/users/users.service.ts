import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { HashService } from './hash.service';
import { User, UserDocument } from './users.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async getUserByUsername(username: string) {
    return this.userModel
      .findOne({
        username,
      })
      .exec();
  }

  async registerUser(createUserDto: CreateUserDto) {
    // validate DTO

    const createUser = new this.userModel(createUserDto);
    // check if user exists
    const user = await this.getUserByUsername(createUser.username);
    if (user) {
      throw new BadRequestException();
    }
    // Hash Password
    createUser.password = await this.hashService.hashPassword(
      createUser.password,
    );

    createUser.save();

    const payload = {
      username: createUser.username,
      sub: createUser.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserById(id: string) {
    return this.userModel.findById(id).exec();
  }
}
