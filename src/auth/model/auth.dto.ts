import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ description: 'User\'s email', example: 'john.doe@mail.com' })
  readonly email: string;

  @ApiProperty({ description: 'User\'s password' })
  readonly password: string;
}
