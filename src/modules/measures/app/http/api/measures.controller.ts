import {
  CreateMeasureDto,
  ResponseMeasureDto,
} from '@modules/measures/domain/entities/measures.entities';
import { MeasuresService } from '@modules/measures/domain/services/measures.service';
import { Body, Controller, Logger, Post, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller({
  path: 'measures',
  version: ['1'],
})
export class MeasuresController {
  private readonly logger = new Logger(MeasuresController.name);

  constructor(private measureService: MeasuresService) {}

  @Get('/')
  @ApiCreatedResponse({ description: 'Get all measures ' })
  @ApiResponse({ type: ResponseMeasureDto, isArray: true })
  findAll(
    @Query('limit') limit: number,
    @Query('orderBy') orderBy: string,
    @Query('orderType') orderType: string,
    @Query('movingAverage') movingAverage: number,
  ): Promise<ResponseMeasureDto[]> {
    this.logger.log('GET : /');
    return this.measureService.findAll(limit, orderBy, orderType, movingAverage);
  }

  @Post('/')
  @ApiCreatedResponse({ description: 'Create a new measures ' })
  @ApiResponse({ type: ResponseMeasureDto })
  create(@Body() payload: CreateMeasureDto): Promise<ResponseMeasureDto> {
    this.logger.log('POST : /');
    return this.measureService.create(payload);
  }
}
