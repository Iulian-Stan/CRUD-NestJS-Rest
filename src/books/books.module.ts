import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './model';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MyBooksController } from './mybooks.controller';
import { MyBooksService } from './mybooks.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), forwardRef(() => UsersModule)],
  providers: [BooksService, MyBooksService],
  controllers: [BooksController, MyBooksController],
  exports: [BooksService]
})
export class BooksModule {}
