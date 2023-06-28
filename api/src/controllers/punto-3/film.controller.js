let _filmService = null;

class FilmController {
  constructor({ FilmService }) {
    _filmService = FilmService;
  }

  async get(req, res) {
    const { filmId } = req.params;
    const film = await _filmService.get(filmId);
    return res.send(film);
  }

  async getAll(req, res) {
    const { pageSize, pageNum } = req.query;
    const films = await _filmService.getAll(pageSize, pageNum);
    return res.send(films);
  }

  async create(req, res) {
    const { body } = req;
    const createdFilm = await _filmService.create(body);
    return res.status(201).send(createdFilm);
  }

  async update(req, res) {
    const { body } = req;
    const { filmId } = req.params;
    const updatedFilm = await _filmService.update(filmId, body);
    return res.send(updatedFilm);
  }

  async delete(req, res) {
    const { filmId } = req.params;
    const deleteFilm = await _filmService.delete(filmId);
    return res.send(deleteFilm);
  }
}

module.exports = FilmController;
