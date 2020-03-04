import Guid from '../../../utils/guid';

class IdGenerator {

  static newId() {
    return Guid.newGuid();
  }
}

export default IdGenerator