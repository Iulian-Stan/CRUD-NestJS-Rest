import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsString, IsOptional } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '1', description: 'Unique identifier', required: false })
  @IsInt()
  @IsOptional()
  id: number;

  @Column({ length: 50 })
  @ApiProperty({ example: 'Susie', description: 'User\'s first_name' })
  @IsString()
  first_name: string;

  @Column({ length: 50 })
  @ApiProperty({ example: 'Osborne', description: 'User\'s last_name' })
  @IsString()
  last_name: string;
}
