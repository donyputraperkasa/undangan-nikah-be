import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { GuestsService } from './guests.service';

describe('GuestsService', () => {
  let service: GuestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuestsService,
        {
          provide: PrismaService,
          useValue: {
            guest: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<GuestsService>(GuestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
