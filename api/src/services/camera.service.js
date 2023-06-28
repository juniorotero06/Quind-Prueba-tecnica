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

  async checkDelayedCameras() {
    try {
      const currentDate = new Date();

      // Consulta todas las cámaras con estado "rented" y fecha de retorno anterior a la fecha actual
      const delayedCameras = await _cameraRepository.findRentedCameras(
        "rented",
        currentDate
      );

      // Actualiza el estado de cada cámara a "delayed"
      for (const camera of delayedCameras) {
        await _cameraRepository.update(camera._id, { status: "delayed" });
      }

      console.log("Delayed cameras updated successfully.");
    } catch (error) {
      console.error("Error updating delayed cameras:", error);
    }
  }
}

module.exports = CameraService;
