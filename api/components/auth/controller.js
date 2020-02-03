const bcrypt = require("bcrypt");
const auth = require("../../../auth");
const TABLE = "Auth";

module.exports = function(injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  async function login(username, password) {
    // Busca en la tabla todos los valores "username"
    const data = await store.query(TABLE, { username: username });

    const match = await bcrypt.compare(password, data.password);
    if (!match) {
      throw new Error("Informacion invalida");
    }
    //Generar token
    return auth.sign({...data});
  }

   async function upsert(data) {
    const authData = {
      id: data.id,
    };

    // Si hay usuario lo actualiza
    if (data.username) {
      authData.username = data.username;
    }

    //Si hay password lo actualiza
    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLE, authData);
  }

  return {
    login,
    upsert
  };
};
