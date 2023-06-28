const BaseRepository = require("./base.repository");
let _store = null;

class StoreRepository extends BaseRepository {
  constructor({ Store }) {
    super(Store);
    _store = Store;
  }
}

module.exports = StoreRepository;
