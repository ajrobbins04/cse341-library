// eslint-disable-next-line node/no-unpublished-require
const swaggerAutogen = require('./node_modules/swagger-autogen')();

// defines openAPI documentation information
const doc = {
  info: {
    title: `Children's Library API`,
    description: `API for the children's section at a library.`,
  },
  host: 'cse-341-library.onrender.com',
  schemes: ['https'],
};

// where the openAPI doc is saved
const outputFile = './swagger.json';

// only include the root route when using express router
const routes = ['./routes/index.js'];

// documentation will be generated as soon as the
// project starts at its root file
swaggerAutogen(outputFile, routes, doc).then(async () => {
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  await import('./server');
});
