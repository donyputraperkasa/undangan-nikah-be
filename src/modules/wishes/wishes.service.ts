import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WishesService {
    constructor(
        private prisma: PrismaService,
    ) {}

    findAll() {
        return this.prisma.wish.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        });
    }

    create(data: any) {
        return this.prisma.wish.create({
        data: {
            guestName: data.name,
            message: data.message,
        },
        });
    }
}
