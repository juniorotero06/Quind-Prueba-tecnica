const { Router } = require("express");

module.exports = function ({ Punto2Controller }) {
  const router = Router();

  router.post("/", Punto2Controller.findLetterIndices);

  return router;
};
