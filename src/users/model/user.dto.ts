import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'John', description: 'User\'s first name' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User\'s last name' })
  lastName: string;
}
