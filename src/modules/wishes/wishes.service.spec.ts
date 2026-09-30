import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { WishesService } from './wishes.service';

describe('WishesService', () => {
  let service: WishesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WishesService,
        {
          provide: PrismaService,
          useValue: {
            wish: {
              findMany: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<WishesService>(WishesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
