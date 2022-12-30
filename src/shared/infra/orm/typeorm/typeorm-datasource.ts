import * as path from 'path';
import { DataSource } from 'typeorm';
import { appConfig } from '@config/application.config';

const basePath = process.cwd();
const migrationsPath = `${basePath}/dist/shared/infra/orm/typeorm/migrations`;
const typeOrmConfig = new DataSource({
  type: 'mongodb',
  url: appConfig.DB_HOST,
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: true,
  entities: [],
  migrations: [path.join(`${migrationsPath}/*{js,ts}`)],
  useNewUrlParser: true,
  logging: true,
});

export default typeOrmConfig;
