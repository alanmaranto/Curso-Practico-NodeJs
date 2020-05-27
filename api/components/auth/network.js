const express = require("express");

const response = require("../../../utils/response");
const AuthController = require("./index");

const router = express.Router();

router.post("/login", function(req, res, next) {
  const { username, password } = req.body;
  AuthController.login(username, password)
    .then(token => {
      response.success(req, res, token, 200);
    })
    .catch(next);
});

module.exports = router;
