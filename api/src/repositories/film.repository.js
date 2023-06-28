const BaseRepository = require("./base.repository");
let _film = null;

class FilmRepository extends BaseRepository {
  constructor({ Film }) {
    super(Film);
    _film = Film;
  }
}

module.exports = FilmRepository;
