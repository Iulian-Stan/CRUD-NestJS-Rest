import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from './user.entity';

export class UserDto {
  @ApiProperty({ description: 'User\'s name', example: 'John Doe' })
  readonly name: string;

  @ApiProperty({ description: 'User\'s email', example: 'john.doe@mail.com' })
  readonly email: string;

  @ApiProperty({ description: 'User\'s password' })
  readonly password: string;

  @ApiProperty({ description: 'User\'s password', enum: UserRole })
  readonly role: UserRole;
}
