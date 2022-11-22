import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'John Doe', description: 'User\'s name' })
  readonly name: string;

  @ApiProperty({ example: 'john.doe@mail.com', description: 'User\'s email' })
  readonly email: string;

  @ApiProperty({ description: 'User\'s password' })
  readonly password: string;
}
