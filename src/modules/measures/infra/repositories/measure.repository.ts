import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeasuresRepository } from '@modules/measures/domain/repositories/measures.repository';
import { ma } from 'moving-averages';
import {
  CreateMeasureDto,
  Measure,
  ResponseMeasureDto,
} from '@modules/measures/domain/entities/measures.entities';
import { appConfig } from '@config/application.config';

@Injectable()
export class MeasuresRepositoryIml implements MeasuresRepository {
  private readonly logger = new Logger(MeasuresRepositoryIml.name);

  public constructor(@InjectRepository(Measure) private ormRepository: Repository<Measure>) {}

  async create(payload: CreateMeasureDto): Promise<ResponseMeasureDto> {
    try {
      return await this.ormRepository.save(await this.ormRepository.create(payload));
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }

  async findAll(
    limit: number,
    orderBy: string,
    orderType: string,
    movingAverage: number,
  ): Promise<ResponseMeasureDto[]> {
    try {
      const measures = await this.ormRepository.find({
        ...(limit && { take: limit }),
        ...(orderBy &&
          orderType && {
            order: {
              [orderBy]: orderType.toUpperCase(),
            },
          }),
      });
      let measuresValues = [...measures].map(measure => measure.pressure);
      measuresValues = movingAverage
        ? ma(measuresValues, movingAverage)
        : ma(measuresValues, appConfig.MOVING_AVERAGE);

      return measures.map((measure, idx) => {
        return {
          ...measure,
          movingAverage: measuresValues[idx] || null,
        };
      });
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }
}
