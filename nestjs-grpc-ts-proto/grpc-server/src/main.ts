import { resolve } from 'path';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ['hero', 'vehicle'],
        protoPath: [
          resolve('../protos/service/hero.proto'),
          resolve('../protos/service/vehicle.proto'),
        ],
        loader: {
          includeDirs: [resolve('../protos/')],
        },
        url: '0.0.0.0:8765',
      },
    },
  );
  await app.listen();
}
bootstrap();
