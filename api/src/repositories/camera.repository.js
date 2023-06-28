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
}

module.exports = CameraRepository;
