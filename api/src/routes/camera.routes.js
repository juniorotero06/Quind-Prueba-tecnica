const { Router } = require("express");

module.exports = function ({ CameraController }) {
  const router = Router();

  router.get("", CameraController.getAll);
  router.get("/:cameraId/unique", CameraController.get);

  router.post("", CameraController.create);

  router.patch("/:cameraId", CameraController.update);

  router.delete("/:cameraId", CameraController.delete);

  return router;
};
