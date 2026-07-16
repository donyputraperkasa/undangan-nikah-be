import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuestsModule } from './modules/guests/guests.module';
import { WishesModule } from './modules/wishes/wishes.module';
import { RsvpModule } from './modules/rsvp/rsvp.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule, 
    GuestsModule, 
    WishesModule, 
    RsvpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
