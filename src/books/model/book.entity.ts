import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/model';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier', example: '1', required: false })
  id: number;

  @Column({ length: 50 })
  @ApiProperty({ description: 'Book title', example: 'Little Red Riding Hood' })
  title: string;

  @Column({ length: 50 })
  @ApiProperty({ description: 'Book author', example: 'Charles Perrault' })
  author: string;

  @Column({ length: 50 })
  @ApiProperty({ description: 'Book description', example: 'Fairy Tale for kids' })
  description: string;

  // Associations
  @ManyToOne(type => User, user => user.books, { onDelete: 'CASCADE' })
  owner: User;
}
