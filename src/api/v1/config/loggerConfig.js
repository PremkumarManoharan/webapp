import winston from 'winston';

const now = new Date();
export const logger = winston.createLogger({
  format: winston.format.json(),
  levels: winston.config.npm.levels,
  defaultMeta: { time: now.toISOString() },
  transports: [
    new winston.transports.File({ filename: 'webapp/webapp.log' }),
  ],
});
