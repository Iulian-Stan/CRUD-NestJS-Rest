import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Book } from '../../books/model';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  ADMIN = "admin",
  USER = "user"
}

@Entity()
export class User {
  @Column({ length: 50 })
  @ApiProperty({ description: 'User\'s name', example: 'John Doe' })
  name: string;

  @PrimaryColumn({ length: 50, unique: true })
  @ApiProperty({ description: 'User\'s email', example: 'john.doe@mail.com' })
  email: string;

  @Column({ length: 50 })
  @ApiProperty({ description: 'User\'s hashed password' })
  password: string;

  @Column({ default: UserRole.USER })
  @ApiProperty({ description: 'User\'s role', example: 'admin|user' })
  role: UserRole;

  // Associations
  @OneToMany(type => Book, book => book.owner, { cascade: true })
  books: Book[];

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
