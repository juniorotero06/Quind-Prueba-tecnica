const BaseRepository = require("./base.repository");
let _client = null;

class ClientRepository extends BaseRepository {
  constructor({ Client }) {
    super(Client);
    _client = Client;
  }

  async saveData(entity) {
    return await _client.save(entity);
  }
}

module.exports = ClientRepository;
