const TABLE = "auth";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
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
    upsert
  };
};
