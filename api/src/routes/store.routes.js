const { Router } = require("express");

module.exports = function ({ StoreController }) {
  const router = Router();

  router.get("", StoreController.getAll);
  router.get("/:storeId/unique", StoreController.get);

  router.post("", StoreController.create);
  router.post("/:storeId/cameras", StoreController.addCamerasToInventory);

  router.patch("/:storeId", StoreController.update);

  router.delete("/:storeId", StoreController.delete);

  return router;
};
