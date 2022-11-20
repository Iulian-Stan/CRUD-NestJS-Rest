import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/model';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '1', description: 'Unique identifier', required: false })
  id: number;

  @Column({ length: 50 })
  @ApiProperty({ example: 'Little Red Riding Hood', description: 'Book title' })
  title: string;

  @Column({ length: 50 })
  @ApiProperty({ example: 'Fairy Tale for kids', description: 'Book description' })
  description: string;

  // Associations
  @ManyToOne(type => User, user => user.books, { onDelete: 'CASCADE' })
  owner: User;
}
