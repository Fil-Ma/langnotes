const expressLoader = require("./express");
const passportLoader = require("./passport");
const routeLoader = require("./routes");
const swaggerLoader = require("./swagger");

module.exports = async (app) => {
  const expressApp = await expressLoader(app);
  const passport = await passportLoader(expressApp);
  await routeLoader(app, passport);
  await swaggerLoader(app);

  // Error handler
  app.use((err, req, res, next) => {
    if (!err.message) {
      return res.status(err.status).send( "An error occured" );
    }

    const { message } = err;
    if (!err.status) {
      return res.status(500).send({ message });
    }

    return res.status(err.status).send({ message });

  });
}
