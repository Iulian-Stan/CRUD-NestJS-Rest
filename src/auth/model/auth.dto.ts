import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'User\'s email', example: 'john.doe@mail.com' })
  readonly email: string;

  @ApiProperty({ description: 'User\'s password' })
  readonly password: string;
}

export class RegisterDto extends LoginDto {
  @ApiProperty({ description: 'User\'s name', example: 'John Doe' })
  readonly name: string;
}
