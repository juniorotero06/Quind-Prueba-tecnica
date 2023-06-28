const BaseRepository = require("./base.repository");
let _camera = null;

class CameraRepository extends BaseRepository {
  constructor({ Camera }) {
    super(Camera);
    _camera = Camera;
  }

  async findByIds(cameraIds) {
    return await _camera.find({ _id: { $in: cameraIds } });
  }

  async findRentedCameras(statusCamera, currentDate) {
    return await _camera.find({
      status: statusCamera,
      returnDate: { $lt: currentDate },
    });
  }
}

module.exports = CameraRepository;
