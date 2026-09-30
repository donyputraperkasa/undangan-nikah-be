import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { RsvpService } from './rsvp.service';

describe('RsvpService', () => {
  let service: RsvpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RsvpService,
        {
          provide: PrismaService,
          useValue: {
            rSVP: {
              findMany: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<RsvpService>(RsvpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
