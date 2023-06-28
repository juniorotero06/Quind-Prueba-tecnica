let _cameraService = null;

class CameraController {
  constructor({ CameraService }) {
    _cameraService = CameraService;
  }

  async get(req, res) {
    const { cameraId } = req.params;
    const camera = await _cameraService.get(cameraId);
    return res.send(camera);
  }

  async getAll(req, res) {
    const { pageSize, pageNum } = req.query;
    const cameras = await _cameraService.getAll(pageSize, pageNum);
    return res.send(cameras);
  }

  async create(req, res) {
    const { body } = req;
    const createdCamera = await _cameraService.create(body);
    return res.status(201).send(createdCamera);
  }

  async update(req, res) {
    const { body } = req;
    const { cameraId } = req.params;
    const updatedCamera = await _cameraService.update(cameraId, body);
    return res.send(updatedCamera);
  }

  async delete(req, res) {
    const { cameraId } = req.params;
    const deleteCamera = await _cameraService.delete(cameraId);
    return res.send(deleteCamera);
  }
}

module.exports = CameraController;
