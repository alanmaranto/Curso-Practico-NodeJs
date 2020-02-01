const express = require("express");

const response = require("../../../utils/response");
const AuthController = require("./index");

const router = express.Router();

router.post("/login", async function(req, res) {
  const { username, password } = req.body;
  try {
    const login = await AuthController.login(username, password);
    response.success(req,res, login, 200)
  } catch (error) {
      response.error(req,res, 'Informacion invalida', 400 )
  }
});

module.exports = router;
