const BaseService = require("./base.service");

let _storeRepository = null,
  _cameraService = null;

class StoreService extends BaseService {
  constructor({ StoreRepository, CameraService }) {
    super(StoreRepository);
    _storeRepository = StoreRepository;
    _cameraService = CameraService;
  }

  async addCamerasToInventory(storeId, cameraIds) {
    const store = await _storeRepository.get(storeId);

    this.validateStoreExists(store);

    const cameras = await _cameraService.findByIds(cameraIds);

    store.availableCameras.push(...cameras);

    await store.save();
  }

  validateStoreExists(store) {
    if (!store) {
      throw new Error("No se encontró la tienda con el ID proporcionado.");
    }
  }
}

module.exports = StoreService;
