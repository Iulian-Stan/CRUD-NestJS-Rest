import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'Susie', description: 'User\'s first_name' })
  first_name: string;

  @ApiProperty({ example: 'Osborne', description: 'User\'s last_name' })
  last_name: string;
}
