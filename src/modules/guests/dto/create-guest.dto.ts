import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGuestDto {
  @ApiProperty({ example: 'Budi Santoso', description: 'Nama tamu undangan' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'budi-santoso',
    description: 'Slug unik untuk undangan tamu',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiPropertyOptional({
    example: 'pending',
    description: 'Status kehadiran awal',
    default: 'pending',
  })
  @IsString()
  @IsOptional()
  attendance?: string;
}
