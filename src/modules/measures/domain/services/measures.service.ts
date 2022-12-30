import { Inject, Injectable, Logger } from '@nestjs/common';
import { MeasuresRepository } from '../repositories/measures.repository';
import { CreateMeasureDto, ResponseMeasureDto } from '../entities/measures.entities';

@Injectable()
export class MeasuresService {
  private readonly logger = new Logger(MeasuresService.name);

  constructor(
    @Inject(MeasuresRepository)
    private readonly measuresRepository: MeasuresRepository,
  ) {}

  async create(payload: CreateMeasureDto): Promise<ResponseMeasureDto> {
    return await this.measuresRepository.create(payload);
  }

  async findAll(
    limit: number,
    orderBy: string,
    orderType: string,
    movingAverage: number,
  ): Promise<ResponseMeasureDto[]> {
    return await this.measuresRepository.findAll(limit, orderBy, orderType, movingAverage);
  }
}
