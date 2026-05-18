import { bootstrap } from './app/bootstrap';
import { AppLogger } from '@shared/logger/app.logger';

const logger = new AppLogger();

bootstrap().catch((err) => {
  logger.error(`Failed to start server: ${err}`);
  process.exit(1);
});
