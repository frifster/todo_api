import { JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JWTConfig implements JwtOptionsFactory {
  constructor(private configservice: ConfigService) {}
  createJwtOptions() {
    return {
      secret: this.configservice.get('secret_hash'),
      signOptions: {
        expiresIn: '60d',
      },
    };
  }
}
