import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', () => {
  errorLogger.error('uncaught exception is detected');
  process.exit(1);
});

let server: Server;
async function database() {
  try {
    await mongoose.connect(config.databaseUrl as string);

    server = app.listen(config.port, (): void => {
      logger.info(
        `🔋  Database connected Successfully and App listening on port ${config.port}`
      );
    });
  } catch (error) {
    errorLogger.error(error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
database();
