import Realm from 'realm';
import UUIDGenerator from 'react-native-uuid-generator';

class Server extends Realm.Object {}
Server.schema = {
  name: 'Server',
  properties: {
    id: 'string',
    address: 'string',
    username: 'string',
    password: 'string',
    active: {type: 'bool', default: false},
    // boolAndDefaultExample: {type: 'bool', default: false},
    // uid: 'string?',
  },
  primaryKey: 'id',
};

export default new Realm({schema: [Server], schemaVersion: 2});
