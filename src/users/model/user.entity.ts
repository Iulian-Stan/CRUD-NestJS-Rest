import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from '../../books/model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '1', description: 'Unique identifier', required: false })
  id: number;

  @Column({ length: 50 })
  @ApiProperty({ example: 'John', description: 'User\'s first name' })
  firstName: string;

  @Column({ length: 50 })
  @ApiProperty({ example: 'Doe', description: 'User\'s last name' })
  lastName: string;

  // Associations
  @OneToMany(type => Book, book => book.owner, { cascade: true })
  books: Book[];
}
