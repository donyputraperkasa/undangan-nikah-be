import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRsvpDto } from './dto/create-rsvp.dto';
import { RsvpService } from './rsvp.service';

@ApiTags('RSVP')
@Controller('rsvp')
export class RsvpController {
  constructor(private readonly rsvpService: RsvpService) {}

  @ApiOperation({ summary: 'Mendapatkan statistik kehadiran RSVP' })
  @Get('stats')
  getStats() {
    return this.rsvpService.getStats();
  }

  @ApiOperation({ summary: 'Mendapatkan seluruh daftar konfirmasi RSVP' })
  @Get()
  findAll() {
    return this.rsvpService.findAll();
  }

  @ApiOperation({ summary: 'Mengirimkan konfirmasi kehadiran RSVP baru' })
  @Post()
  create(@Body() createRsvpDto: CreateRsvpDto) {
    return this.rsvpService.create(createRsvpDto);
  }
}
