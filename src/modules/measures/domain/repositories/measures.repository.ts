import { CreateMeasureDto, ResponseMeasureDto } from '../entities/measures.entities';

export interface MeasuresRepository {
  create(payload: CreateMeasureDto): Promise<ResponseMeasureDto>;
  findAll(
    limit: number,
    orderBy: string,
    orderType: string,
    movingAverage: number,
  ): Promise<ResponseMeasureDto[]>;
}

export const MeasuresRepository = Symbol('MeasuresRepository');
