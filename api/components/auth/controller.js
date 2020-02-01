const auth = require('../../../auth');
const TABLE = "auth";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  async function login (username, password) {
    // Busca en la tabla todos los valores "username"
    const data = await store.query(TABLE, { username: username })
    if (data.password === password) {
      //Generar token
      return auth.sign(data)
    } else {
      throw new Error('Informacion invalida')
    }
  }

  function upsert(data) {
    const authData = {
      id: data.id
    };

    // Si hay usuario lo actualiza
    if (data.username) {
      authData.username = data.username;
    }

    //Si hay password lo actualiza
    if (data.password) {
      authData.password = data.password;
    }

    return store.upsert(TABLE, authData);
  }

  return {
    login,
    upsert
  };
};
