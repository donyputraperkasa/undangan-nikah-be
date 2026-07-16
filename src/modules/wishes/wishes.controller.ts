import {
    Body,
    Controller,
    Get,
    Post,
} from '@nestjs/common';

import { WishesService } from './wishes.service';

@Controller('wishes')
export class WishesController {
    constructor(
        private readonly wishesService: WishesService,
    ) {}

    @Get()
    findAll() {
        return this.wishesService.findAll();
    }

    @Post()
    create(@Body() body: any) {
        return this.wishesService.create(body);
    }
}
