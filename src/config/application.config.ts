import { cleanEnv, num, str } from 'envalid';

export const appConfig = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production'], default: 'development' }),
  PORT: num({ default: 3001 }),
  DB_HOST: str({
    default:
      'mongodb+srv://gtelesio:XzmV4hSRbdm9OlIf@cluster0.58fmlz6.mongodb.net/?retryWrites=true&w=majority',
  }),
  MOVING_AVERAGE: num({ default: 13 }),
});
