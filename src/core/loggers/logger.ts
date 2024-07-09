import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as chalk from 'chalk';
import { v4 } from 'uuid';

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  let coloredLevel;
  const requestId = v4();
  switch (level) {
    case 'error':
      coloredLevel = chalk.red(level.toUpperCase());
      break;
    case 'warn':
      coloredLevel = chalk.yellow(level.toUpperCase());
      break;
    case 'info':
      coloredLevel = chalk.blue(level.toUpperCase());
      break;
    case 'debug':
      coloredLevel = chalk.magenta(level.toUpperCase());
      break;
    default:
      coloredLevel = chalk.green(level.toUpperCase());
  }
  return `${chalk.gray(timestamp)} ${coloredLevel}: ${requestId} ${message}`;
});

const transports = [
  new winston.transports.Console(),
  new winston.transports.DailyRotateFile({
    filename: 'logs/application-%DATE%.info.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'info',
  }),
  new winston.transports.DailyRotateFile({
    filename: 'logs/application-%DATE%.error.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error',
  }),
];

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
    logFormat,
  ),
  transports,
});

export { logger };
