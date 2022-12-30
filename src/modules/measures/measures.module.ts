import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasuresRepositoryIml } from './infra/repositories/measure.repository';
import { Measure } from './domain/entities/measures.entities';
import { MeasuresController } from './app/http/api/measures.controller';
import { MeasuresService } from './domain/services/measures.service';
import { MeasuresRepository } from './domain/repositories/measures.repository';

@Module({
  imports: [Logger, TypeOrmModule.forFeature([Measure])],
  controllers: [MeasuresController],
  providers: [
    MeasuresService,
    {
      provide: MeasuresRepository,
      useClass: MeasuresRepositoryIml,
    },
  ],
  exports: [MeasuresRepository],
})
export class MeasuresModule {}
