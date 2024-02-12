const swaggerAutogen = require('./node_modules/swagger-autogen')();

// defines openAPI documentation information
const doc = {
  info: {
    title: 'Contacts API',
    description: 'API of Known Contacts.',
  },
  host: 'cse341-01-test.onrender.com',
  schemes: ['https'],
};

// where the openAPI doc is saved
const outputFile = './swagger.json';

// only include the root route when using express router
const routes = ['./routes/index.js'];

// documentation will be generated as soon as the
// project starts at its root file
swaggerAutogen(outputFile, routes, doc).then(async () => {
  // eslint-disable-next-line import/extensions
  await import('./server.js');
});
