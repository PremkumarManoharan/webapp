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
  levels: winston.config.npm.levels,
  defaultMeta: { time: now.toISOString() },
  transports: [
    new winston.transports.File({ filename: logLocation }),
  ],
});
