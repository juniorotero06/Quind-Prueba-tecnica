const { Router } = require("express");

module.exports = function ({ FilmController }) {
  const router = Router();

  router.get("", FilmController.getAll);
  router.get("/:filmId/unique", FilmController.get);

  router.post("", FilmController.create);

  router.patch("/:filmId", FilmController.update);

  router.delete("/:filmId", FilmController.delete);

  return router;
};
