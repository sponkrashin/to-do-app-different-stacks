import * as http from 'http';
import createLogger from 'debug';
import * as dotenv from 'dotenv';
import app from './app';

dotenv.config();

const logger = createLogger('to-do-server:server');

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', serverOnError);
server.on('listening', serverOnListening);

function serverOnError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function serverOnListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr!.port;
  logger('Listening on ' + bind);
}
