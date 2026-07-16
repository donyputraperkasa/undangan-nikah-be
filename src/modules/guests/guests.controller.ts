import {
    Body,
    Controller,
    Get,
    Param,
    Post,
} from '@nestjs/common';

import { GuestsService } from './guests.service';

@Controller('guests')
export class GuestsController {
    constructor(
        private readonly guestsService: GuestsService,
    ) {}

    @Get()
    findAll() {
        return this.guestsService.findAll();
    }

    @Get(':slug')
    findBySlug(@Param('slug') slug: string) {
        return this.guestsService.findBySlug(slug);
    }

    @Post()
    create(@Body() body: any) {
        return this.guestsService.create(body);
    }
}
