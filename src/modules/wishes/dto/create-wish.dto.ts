import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWishDto {
  @ApiProperty({ example: 'Budi Santoso', description: 'Nama pemberi ucapan' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Selamat menempuh hidup baru Nugroho & Agata!',
    description: 'Pesan ucapan dan doa',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
