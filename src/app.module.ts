import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiVersionGuard } from './api';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true
    }),
    UsersModule
  ],  
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiVersionGuard
    }
  ]
})
export class AppModule {}
