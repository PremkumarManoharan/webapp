import winston from 'winston';

const now = new Date();

const logLocation = "";
if(process.env.NODE_ENV === "test"){
    logLocation = 'webapp.log'
}else{
    logLocation = '/var/log/webapp.log'
}

export const logger = winston.createLogger({
  format: winston.format.json(),
  levels: winston.config.npm.levels,
  defaultMeta: { time: now.toISOString() },
  transports: [
    new winston.transports.File({ filename: logLocation }),
  ],
});
