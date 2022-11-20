import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [forwardRef(() => BooksModule), TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
