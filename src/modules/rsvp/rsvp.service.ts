import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRsvpDto } from './dto/create-rsvp.dto';

@Injectable()
export class RsvpService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.rSVP.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  create(data: CreateRsvpDto) {
    return this.prisma.rSVP.create({
      data: {
        guestName: data.name,
        attendance: data.attendance,
        totalGuest: Number(data.totalGuest ?? 1),
      },
    });
  }

  async getStats() {
    const rsvps = await this.prisma.rSVP.findMany();

    const totalRSVP = rsvps.length;

    const totalAttending = rsvps.filter(
      (item) => item.attendance === 'attending',
    ).length;

    const totalNotAttending = rsvps.filter(
      (item) => item.attendance === 'not-attending',
    ).length;

    const totalGuests = rsvps.reduce(
      (total, item) => total + item.totalGuest,
      0,
    );

    return {
      totalRSVP,
      totalAttending,
      totalNotAttending,
      totalGuests,
    };
  }
}
