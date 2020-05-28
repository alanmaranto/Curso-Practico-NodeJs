const nanoid = require("nanoid");
const error = require("../../../utils/error");
const TABLE = "post";

module.exports = function(injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  function list(query) {
    return store.list(TABLE);
  }

  async function get(id) {
    const user = await Store.get(TABLE, id);
    if (!user) {
      throw error("No existe el post", 404);
    }

    return user;
  }

  async function upsert(data, user) {
    const post = {
      id: data.id,
      user: user,
      text: data.text
    };

    if (!post.id) {
      post.id = nanoid();
    }

    return store.upsert(TABLE, post).then(() => post);
  }

  async function like(post, user) {
    const like = await Store.upsert(TABLE + "_like", {
      post: post,
      user: user
    });

    return like;
  }

  async function postsLiked(user) {
    const users = await Store.query(
      TABLE + "_like",
      { user: user },
      { post: post }
    );
    return users;
  }

  async function postLikers(post) {
    const users = await Store.query(
      TABLE + "_like",
      { post: post },
      { post: post }
    );
    return users;
  }

  return {
    list,
    get,
    upsert,
    like,
    postsLiked,
    postLikers,
  };
};
