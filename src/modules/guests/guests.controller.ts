import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGuestDto } from './dto/create-guest.dto';
import { GuestsService } from './guests.service';

@ApiTags('Guests / Invitation')
@Controller(['guests', 'invitation'])
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  @ApiOperation({ summary: 'Mendapatkan semua daftar tamu undangan' })
  @Get()
  findAll() {
    return this.guestsService.findAll();
  }

  @ApiOperation({ summary: 'Mendapatkan informasi tamu berdasarkan slug' })
  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.guestsService.findBySlug(slug);
  }

  @ApiOperation({ summary: 'Membuat data tamu undangan baru' })
  @Post()
  create(@Body() createGuestDto: CreateGuestDto) {
    return this.guestsService.create(createGuestDto);
  }
}
