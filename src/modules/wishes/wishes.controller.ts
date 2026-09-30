import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateWishDto } from './dto/create-wish.dto';
import { WishesService } from './wishes.service';

@ApiTags('Wishes')
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @ApiOperation({ summary: 'Mendapatkan semua ucapan dan doa pernikahan' })
  @Get()
  findAll() {
    return this.wishesService.findAll();
  }

  @ApiOperation({ summary: 'Mengirimkan ucapan dan doa pernikahan baru' })
  @Post()
  create(@Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto);
  }
}
