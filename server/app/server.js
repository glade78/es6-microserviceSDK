import Constants from './config/constants';
import app from './middleware/middleware';

app.listen(Constants.server.port, () => {
  // eslint-disable-next-line no-console
  console.log(`
    Port: ${Constants.port}
    Env: ${app.get('env')}
  `);
});

export default app;