const BaseService = require("./base.service");

let _cameraRepository = null;

class CameraService extends BaseService {
  constructor({ CameraRepository }) {
    super(CameraRepository);
    _cameraRepository = CameraRepository;
  }

  async findByIds(cameraIds) {
    if (cameraIds.lengt === 0) {
      const error = new Error();
      error.status = 400;
      error.message = "at least one camera must be sent";
      throw error;
    }

    const currentEntities = await _cameraRepository.findByIds(cameraIds);

    if (currentEntities.length === 0) {
      const error = new Error();
      error.status = 404;
      error.message = "Entities not found";
      throw error;
    }

    return currentEntities;
  }
}

module.exports = CameraService;
