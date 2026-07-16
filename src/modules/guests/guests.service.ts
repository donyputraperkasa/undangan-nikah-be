import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GuestsService {
    constructor(
        private prisma: PrismaService,
    ) {}

    findAll() {
        return this.prisma.guest.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findBySlug(slug: string) {
        return this.prisma.guest.findUnique({
            where: {
                slug,
            },
        });
    }

    create(data: any) {
        return this.prisma.guest.create({
            data: {
                name: data.name,
                slug: data.slug,
                attendance: data.attendance ?? 'pending',
            },
        });
    }
}
