let _storeService = null;

class StoreController {
  constructor({ StoreService }) {
    _storeService = StoreService;
  }

  async get(req, res) {
    const { storeId } = req.params;
    const store = await _storeService.get(storeId);
    return res.send(store);
  }

  async getAll(req, res) {
    const { pageSize, pageNum } = req.query;
    const stores = await _storeService.getAll(pageSize, pageNum);
    return res.send(stores);
  }

  async create(req, res) {
    const { body } = req;
    const createdStore = await _storeService.create(body);
    return res.status(201).send(createdStore);
  }

  async update(req, res) {
    const { body } = req;
    const { storeId } = req.params;
    const updatedStore = await _storeService.update(storeId, body);
    return res.send(updatedStore);
  }

  async delete(req, res) {
    const { storeId } = req.params;
    const deleteStore = await _storeService.delete(storeId);
    return res.send(deleteStore);
  }

  async addCamerasToInventory(req, res) {
    const { storeId } = req.params;
    const { cameraIds } = req.body;

    const store = await _storeService.get(storeId);
    if (!store) {
      throw new Error("No se encontró la tienda con el ID proporcionado.");
    }

    await _storeService.addCamerasToInventory(storeId, cameraIds);

    return res.send({
      message: "Las cámaras han sido agregadas al inventario de la tienda.",
    });
  }
}

module.exports = StoreController;
