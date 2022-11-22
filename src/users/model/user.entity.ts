import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from '../../books/model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '1', description: 'Unique identifier', required: false })
  id: number;

  @Column({ length: 50 })
  @ApiProperty({ example: 'John Doe', description: 'User\'s name' })
  name: string;

  @Column({ length: 50 })
  @ApiProperty({ example: 'john.doe@mail.com', description: 'User\'s email' })
  email: string;

  @Column({ length: 50 })
  @ApiProperty({ description: 'User\'s hashed password' })
  password: string;

  // Associations
  @OneToMany(type => Book, book => book.owner, { cascade: true })
  books: Book[];
}
