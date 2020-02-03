const express = require("express");

const secure = require("./secure");
const response = require("../../../utils/response");
const UserController = require("./index");

const router = express.Router();

//Routes
router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);
router.post("/follow/:id", secure('follow'),follow);
router.put("/", secure("update"), upsert);

//Internal functions
function list(req, res, next) {
  UserController.list()
    .then(list => {
      response.success(req, res, list, 200);
    })
    .catch(next);
}

// Promise
function get(req, res, next) {
  const { id } = req.params;
  UserController.get(id)
    .then(user => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

function upsert(req, res, next) {
  UserController.upsert(req.body)
    .then(user => {
      response.success(req, res, user, 201);
    })
    .catch(next);
}

function follow(req,res,next) {
  UserController.follow(req.user.id, req.params.id)
  .then(data => {
    response.success(req,res,data,201);
  })
  .catch(next)
}

module.exports = router;
