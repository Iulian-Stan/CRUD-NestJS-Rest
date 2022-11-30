import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty({ description: 'Book title', example: 'Little Red Riding Hood' })
  readonly title: string;

  @ApiProperty({ description: 'Book author', example: 'Charles Perrault' })
  readonly author: string;

  @ApiProperty({ description: 'Book description', example: 'Fairy Tale for kids' })
  readonly description: string;

  @ApiProperty({ description: 'Owner identifier' })
  readonly ownerId: string;
}
