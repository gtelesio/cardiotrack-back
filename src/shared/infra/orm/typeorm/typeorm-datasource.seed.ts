import { appConfig } from '../../../../config/application.config';

export default {
  type: 'mongodb',
  url: appConfig.DB_HOST,
  entities: [],
  synchronize: true,
  seeds: ['src/shared/infra/orm/typeorm/seeds/**/*{.ts,.js}'],
  factories: ['src/shared/infra/orm/typeorm/factories/**/*{.ts,.js}'],
};
