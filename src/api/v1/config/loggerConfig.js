import winston from 'winston';

const now = new Date();

let logLocation = "";
if(process.env.NODE_ENV === "test"){
    logLocation = 'webapp.log'
}else{
    logLocation = '/tmp/webapp.log'
}
export const logger = winston.createLogger({
  format: winston.format.json(),
  level: 'debug',
  defaultMeta: { time: (now.toISOString()).slice(0, -5) + "Z" }, //removing milli seconds
  transports: [
    new winston.transports.File({ filename: logLocation }),
  ],
});

logger.warn('New version of nodejs is available');
