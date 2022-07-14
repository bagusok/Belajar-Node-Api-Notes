/* eslint-disable require-jsdoc */
const Hapi = require('@hapi/hapi');
const { route } = require('@hapi/hapi/lib/cors');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log('server akan berjalan pada ' + server.info.uri);
};

init();
