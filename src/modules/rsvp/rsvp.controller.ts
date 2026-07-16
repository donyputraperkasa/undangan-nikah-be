import {
    Body,
    Controller,
    Get,
    Post,
} from '@nestjs/common';

import { RsvpService } from './rsvp.service';

@Controller('rsvp')
export class RsvpController {
    constructor(
        private readonly rsvpService: RsvpService,
    ) {}

    @Get('stats')
    getStats() {
        return this.rsvpService.getStats();
    }

    @Get()
    findAll() {
        return this.rsvpService.findAll();
    }

    @Post()
    create(@Body() body: any) {
        return this.rsvpService.create(body);
    }
}
