import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWishDto } from './dto/create-wish.dto';

@Injectable()
export class WishesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.wish.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  create(data: CreateWishDto) {
    return this.prisma.wish.create({
      data: {
        guestName: data.name,
        message: data.message,
      },
    });
  }
}
