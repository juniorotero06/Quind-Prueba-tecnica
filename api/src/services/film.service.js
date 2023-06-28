const BaseService = require("./base.service");

let _filmRepository = null;

class FilmService extends BaseService {
  constructor({ FilmRepository }) {
    super(FilmRepository);
    _filmRepository = FilmRepository;
  }
}

module.exports = FilmService;
