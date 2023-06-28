const { createContainer, asClass, asValue, asFunction } = require("awilix");
// Services
const {
  CameraService,
  ClientService,
  FilmService,
  StoreService,
} = require("../services");
//Controllers
const {
  Punto1Controller,
  Punto2Controller,
  CameraController,
  ClientController,
  FilmController,
  StoreController,
} = require("../controllers");
//Models
const { Camera, Client, Film, Store } = require("../models");
//Repositorie
const {
  CameraRepository,
  ClientRepository,
  FilmRepository,
  StoreRepository,
} = require("../repositories");
// Routes
const {
  Punto1Routes,
  Punto2Routes,
  CameraRoutes,
  ClientRoutes,
  FilmRoutes,
  StoreRoutes,
} = require("../routes/index.routes");
const Routes = require("../routes");
// Config
const config = require("../config");
const app = require("./index");

const container = createContainer();

container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
  })
  .register({
    Punto1Controller: asClass(
      Punto1Controller.bind(Punto1Controller)
    ).singleton(),
    Punto2Controller: asClass(
      Punto2Controller.bind(Punto2Controller)
    ).singleton(),
    CameraController: asClass(
      CameraController.bind(CameraController)
    ).singleton(),
    ClientController: asClass(
      ClientController.bind(ClientController)
    ).singleton(),
    FilmController: asClass(FilmController.bind(FilmController)).singleton(),
    StoreController: asClass(StoreController.bind(StoreController)).singleton(),
  })
  .register({
    Punto1Routes: asFunction(Punto1Routes).singleton(),
    Punto2Routes: asFunction(Punto2Routes).singleton(),
    CameraRoutes: asFunction(CameraRoutes).singleton(),
    ClientRoutes: asFunction(ClientRoutes).singleton(),
    FilmRoutes: asFunction(FilmRoutes).singleton(),
    StoreRoutes: asFunction(StoreRoutes).singleton(),
  })
  .register({
    Camera: asValue(Camera),
    Film: asValue(Film),
    Client: asValue(Client),
    Store: asValue(Store),
  })
  .register({
    CameraRepository: asClass(CameraRepository).singleton(),
    ClientRepository: asClass(ClientRepository).singleton(),
    FilmRepository: asClass(FilmRepository).singleton(),
    StoreRepository: asClass(StoreRepository).singleton(),
  })
  .register({
    CameraService: asClass(CameraService).singleton(),
    ClientService: asClass(ClientService).singleton(),
    FilmService: asClass(FilmService).singleton(),
    StoreService: asClass(StoreService).singleton(),
  });

module.exports = container;
