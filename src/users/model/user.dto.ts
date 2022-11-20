import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'John', description: 'User\'s first name' })
  readonly firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User\'s last name' })
  readonly lastName: string;
}
