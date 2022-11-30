import { ApiProperty } from '@nestjs/swagger';

export class JwtTokenDto {
  @ApiProperty({ description: 'Access token' })
  readonly access_token: string;
}
