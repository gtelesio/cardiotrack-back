import * as path from 'path';
import { Module } from '@nestjs/common';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from '@shared/infra/orm/typeorm/typeorm-datasource';
import { HealthModule } from '@modules/health/health.module';
import { MeasuresModule } from '@modules/measures/measures.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig.options),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver],
    }),
    TypeOrmModule.forRoot(typeOrmConfig.options),
    HealthModule,
    MeasuresModule,
  ],
})
export class AppModule {}
