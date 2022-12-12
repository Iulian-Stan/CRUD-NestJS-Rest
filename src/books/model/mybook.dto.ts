import { ApiProperty } from '@nestjs/swagger';

export class MyBookDto {
  @ApiProperty({ required: false, description: 'Book title', example: 'Little Red Riding Hood' })
  readonly title: string;

  @ApiProperty({ required: false, description: 'Book author', example: 'Charles Perrault' })
  readonly author: string;

  @ApiProperty({ required: false, description: 'Book description', example: 'Fairy Tale for kids' })
  readonly description: string;
}
