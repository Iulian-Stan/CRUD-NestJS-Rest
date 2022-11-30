import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Book } from '../../books/model';

@Entity()
export class User {
  @Column({ length: 50 })
  @ApiProperty({ description: 'User\'s name', example: 'John Doe' })
  name: string;

  @PrimaryColumn({ length: 50 })
  @ApiProperty({ description: 'User\'s email', example: 'john.doe@mail.com' })
  email: string;

  @Column({ length: 50 })
  @ApiProperty({ description: 'User\'s hashed password' })
  password: string;

  // Associations
  @OneToMany(type => Book, book => book.owner, { cascade: true })
  books: Book[];
}
