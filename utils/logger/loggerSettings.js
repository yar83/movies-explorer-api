import fs from 'fs';
import path from 'path';
import mjson from 'morgan-json';

const dirname = process.cwd();

const format = mjson({
  date: ':date[clf]',
  http_version: ':http-version',
  method: ':method',
  referrer: ':referrer',
  'remote address': ':remote-addr',
  'req[header]': ':req[content-type]',
  'res[header]': 'res[content-type]',
  'response time': ':response-time[3]',
  status: ':status',
  'total time': 'total-time[3]',
  url: ':url',
  'user agent': ':user-agent',
});

const logger = {
  logFormat: format,
  logStream: () => fs.createWriteStream(path.join(dirname, 'logs/request.log'), { flags: 'a' }),
  errStream: () => fs.createWriteStream(path.join(dirname, 'logs/error.log'), { flags: 'a' }),
};

['request.log', 'error.log'].forEach((file) => {
  try {
    fs.accessSync(path.join(dirname, `logs/${file}`));
  } catch {
    fs.mkdirSync(path.join(dirname, 'logs'), { recursive: true });
    fs.writeFileSync(path.join(dirname, `logs/${file}`), '');
  }
});

export default logger;
