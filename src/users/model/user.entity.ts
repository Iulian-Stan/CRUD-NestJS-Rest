import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '1', description: 'Unique identifier', required: false })
  id: number;

  @Column({ length: 50 })
  @ApiProperty({ example: 'Susie', description: 'User\'s first_name' })
  first_name: string;

  @Column({ length: 50 })
  @ApiProperty({ example: 'Osborne', description: 'User\'s last_name' })
  last_name: string;
}
