let _clientService = null;

class ClientController {
  constructor({ ClientService }) {
    _clientService = ClientService;
  }

  async get(req, res) {
    const { clientId } = req.params;
    const client = await _clientService.get(clientId);
    return res.send(client);
  }

  async getAll(req, res) {
    const { pageSize, pageNum } = req.query;
    const clients = await _clientService.getAll(pageSize, pageNum);
    return res.send(clients);
  }

  async create(req, res) {
    const { body } = req;
    const createdClient = await _clientService.create(body);
    return res.status(201).send(createdClient);
  }

  async update(req, res) {
    const { body } = req;
    const { clientId } = req.params;
    const updatedClient = await _clientService.update(clientId, body);
    return res.send(updatedClient);
  }

  async delete(req, res) {
    const { clientId } = req.params;
    const deleteClient = await _clientService.delete(clientId);
    return res.send(deleteClient);
  }

  async rentCameraToClient(req, res) {
    const { cameraId, clientId } = req.params;

    const rentedCameratoClient = await _clientService.rentCameraToClientService(
      cameraId,
      clientId
    );

    return res.send(rentedCameratoClient);
  }

  async returnCamera(req, res) {
    const { cameraId, clientId } = req.params;

    const renturnCameratoClient = await _clientService.returnCameraService(
      cameraId,
      clientId
    );

    return res.send(renturnCameratoClient);
  }
}

module.exports = ClientController;
