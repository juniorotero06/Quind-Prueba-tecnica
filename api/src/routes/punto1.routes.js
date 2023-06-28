const { Router } = require("express");

module.exports = function ({ Punto1Controller }) {
  const router = Router();

  router.post("/", Punto1Controller.sortNumbers);

  return router;
};
