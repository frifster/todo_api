import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';

import { config } from 'config';
import { DatabaseConfig } from './database.config';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TodosModule,
    CommentsModule,
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
  ],
})
export class AppModule {}
