const express = require("express");

const response = require("../../../utils/response");
const Controller = require("./index");

const router = express.Router();

//Routes
router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);
router.put("/", upsert);

//Internal functions
// Async Await
async function list(req, res, next) {
  try {
    const acutalList = await Controller.list();
    response.success(req, res, acutalList, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}

// Promise
function get(req, res, next) {
  Controller.get(req.params.id)
    .then(user => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

function upsert(req, res, next) {
  try {
    const user = Controller.upsert(req.body);
    response.success(req, res, user, 201);
  } catch(error) {
    response.error(req, res, error.message, 500);
  };
}

module.exports = router;
