import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGuestDto } from './dto/create-guest.dto';

@Injectable()
export class GuestsService {
  constructor(private readonly prisma: PrismaService) {}

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

  create(data: CreateGuestDto) {
    return this.prisma.guest.create({
      data: {
        name: data.name,
        slug: data.slug,
        attendance: data.attendance ?? 'pending',
      },
    });
  }
}
