const BaseService = require("./base.service");
const moment = require("moment");

let _clientRepository = null,
  _cameraService = null;

class ClientService extends BaseService {
  constructor({ ClientRepository, CameraService }) {
    super(ClientRepository);
    _clientRepository = ClientRepository;
    _cameraService = CameraService;
  }

  //////////////////// Rent Camera Methods////////////////////

  async rentCameraToClientService(cameraId, clientId) {
    const client = await _clientRepository.get(clientId);

    this.validateClientRentingCamera(client);

    const camera = await _cameraService.get(cameraId);

    this.validateCameraAvailability(camera);

    const returnCamera = this.calculateReturnDate();

    await _cameraService.update(cameraId, {
      status: "rented",
      returnDate: returnCamera,
    });
    await _clientRepository.update(clientId, { rentedCamera: cameraId });

    return {
      message: "La cámara ha sido alquilada al cliente exitosamente.",
    };
  }

  calculateReturnDate() {
    const rentDate = moment();
    const returnDate = moment(rentDate).add(31, "days");
    return returnDate.toDate();
  }

  validateClientRentingCamera(client) {
    if (client.rentedCamera) {
      throw new Error("El cliente ya tiene una cámara alquilada.");
    }

    if (client.penaltyMonths > 0) {
      throw new Error(
        "El cliente tiene una multa y no puede rentar cámaras por el momento."
      );
    }
  }

  validateCameraAvailability(camera) {
    if (camera.status !== "available") {
      throw new Error("La cámara no está disponible para alquilar.");
    }
  }

  //////////// Return Camera Methods/////////////////////

  async returnCameraService(cameraId, clientId) {
    const client = await _clientRepository.get(clientId);
    const camera = await _cameraService.get(cameraId);

    this.validateClientHasRentedCamera(client, cameraId);

    if (camera.status === "delayed") {
      const daysDelayed = this.calculateDaysDelayed(camera.returnDate);
      const penaltyMonths = daysDelayed * 30;

      await this.applyPenalty(clientId, penaltyMonths);
    }

    await _cameraService.update(cameraId, { status: "available" });
    await _clientRepository.update(clientId, { rentedCamera: {} });

    return {
      message: "La cámara ha sido devuelta exitosamente.",
    };
  }

  validateClientHasRentedCamera(client, cameraId) {
    if (!client.rentedCamera || client.rentedCamera.toString() !== cameraId) {
      throw new Error(
        "El cliente no tiene una cámara alquilada con el ID proporcionado."
      );
    }
  }

  calculateDaysDelayed(returnDate) {
    const currentDate = new Date();
    const returnDateObj = new Date(returnDate);
    const oneDay = 1000 * 60 * 60 * 24;
    const daysDelayed = Math.ceil((currentDate - returnDateObj) / oneDay);

    return daysDelayed;
  }

  async applyPenalty(clientId, penaltyMonths) {
    const client = await _clientRepository.get(clientId);
    if (!client) {
      throw new Error("Client not found");
    }

    client.penaltyMonths += penaltyMonths;

    await _clientRepository.saveData(client);

    return client;
  }
}

module.exports = ClientService;
