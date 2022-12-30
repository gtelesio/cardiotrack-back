import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller({ version: '1', path: 'health' })
@ApiTags('health')
export class HealthController {
  public constructor(private health: HealthCheckService, private db: TypeOrmHealthIndicator) {}

  @Get()
  @HealthCheck()
  public check(): Promise<HealthCheckResult> {
    const indicators = [(): Promise<HealthIndicatorResult> => this.db.pingCheck('database')];
    return this.health.check(indicators);
  }
}
