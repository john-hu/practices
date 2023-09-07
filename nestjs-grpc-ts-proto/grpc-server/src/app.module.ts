import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroController } from './hero.controller';
import { VehicleController } from './vehicle.controller';

@Module({
  imports: [],
  controllers: [AppController, HeroController, VehicleController],
  providers: [AppService],
})
export class AppModule {}
