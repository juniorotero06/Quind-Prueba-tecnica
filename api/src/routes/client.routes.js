const { Router } = require("express");

module.exports = function ({ ClientController }) {
  const router = Router();

  router.get("", ClientController.getAll);
  router.get("/:clientId/unique", ClientController.get);
  router.get("/rent/:clientId/:cameraId", ClientController.rentCameraToClient);
  router.get("/return/:clientId/:cameraId", ClientController.returnCamera);

  router.post("", ClientController.create);

  router.patch("/:clientId", ClientController.update);

  router.delete("/:clientId", ClientController.delete);

  return router;
};
