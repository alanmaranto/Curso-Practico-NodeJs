const auth = require("../../../auth");
const PostController = require("./index");

function checkAuth(action, options) {
  async function middleware(req, res, next) {
    switch (action) {
      case "add":
      case "list_own":
        auth.check.logged(req);
        next();
        break;

      case "update":
        const post = await PostController.get(req.body.id);
        auth.check.own(req, post.user);
        next();
        break;

      default:
        next();
    }
  }

  return middleware;
}

module.exports = checkAuth;
