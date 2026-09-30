import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRsvpDto {
  @ApiProperty({
    example: 'Budi Santoso',
    description: 'Nama tamu konfirmasi RSVP',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'attending',
    description: 'Status kehadiran (attending atau not-attending)',
  })
  @IsString()
  @IsNotEmpty()
  attendance: string;

  @ApiPropertyOptional({
    example: 2,
    description: 'Jumlah tamu yang hadir',
    default: 1,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  totalGuest?: number;
}
