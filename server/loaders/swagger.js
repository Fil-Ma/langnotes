const yaml = require('js-yaml');
const fs = require('fs');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = yaml.load(fs.readFileSync('../langnotes-openapi-docs.yaml', 'utf8'));

module.exports = (app) => {
  // Serves Swagger API documentation to /docs url
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
