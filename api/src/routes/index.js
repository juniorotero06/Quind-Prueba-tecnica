const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("express-async-errors");

const { ErrorMiddleware, NotFoundMiddleware } = require("../middlewares");

module.exports = function ({
  Punto1Routes,
  Punto2Routes,
  CameraRoutes,
  ClientRoutes,
  FilmRoutes,
  StoreRoutes,
}) {
  const router = express.Router();
  const apiRouter = express.Router();

  apiRouter.use(express.json()).use(cors()).use(helmet()).use(compression());

  apiRouter.use("/punto-1", Punto1Routes);
  apiRouter.use("/punto-2", Punto2Routes);
  apiRouter.use("/camera", CameraRoutes);
  apiRouter.use("/client", ClientRoutes);
  apiRouter.use("/film", FilmRoutes);
  apiRouter.use("/store", StoreRoutes);

  router.use("/v1/api", apiRouter);

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
