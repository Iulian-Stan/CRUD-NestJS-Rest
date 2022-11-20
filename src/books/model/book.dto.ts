import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty({ example: 'Little Red Riding Hood', description: 'Book title' })
  readonly title: string;

  @ApiProperty({ example: 'Fairy Tale for kids', description: 'Book description' })
  readonly description: string;

  @ApiProperty({ description: 'Owner ID' })
  readonly userID: number;
}
