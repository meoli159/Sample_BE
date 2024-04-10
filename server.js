import { app } from './src/app.js';

const port = process.env.PORT || 3333;

const server = app.listen(port, async () => {
  console.log(`Example app listening on http://127.0.0.1:${port}`);
});

process.on('SIGINT', SHUTDOWN);

function SHUTDOWN() {
  console.log('\nReceived kill signal, shutting down gracefully');
  server.close(() => {
    console.log('Express Server is closed!!');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}
