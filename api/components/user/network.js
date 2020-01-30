const express = require("express");
const response = require("../../../utils/response");
const Controller = require("./index");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const list = await Controller.list();
    response.success(req, res, list, 200);
  } catch (error) {
    response.error(req, res, err.message, 500);
  }
});

router.get("/:id", (req, res) => {
  Controller.get(req.params.id)
    .then(user => {
      response.success(req, res, user, 200);
    })
    .catch(err => {
      response.error(req, res, err.message, 500);
    });
});

module.exports = router;
