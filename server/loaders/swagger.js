const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const swaggerUi = require("swagger-ui-express");

const docsPath = path.join(__dirname, "../langnotes-openapi-docs.yaml");
const swaggerDocument = yaml.load(fs.readFileSync(docsPath, 'utf8'));


module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
